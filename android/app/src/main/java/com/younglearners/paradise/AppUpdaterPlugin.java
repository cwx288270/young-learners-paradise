package com.younglearners.paradise;

import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@CapacitorPlugin(name = "AppUpdater")
public class AppUpdaterPlugin extends Plugin {

    @PluginMethod
    public void install(PluginCall call) {
        String url = call.getString("url");
        if (url == null || url.isEmpty()) {
            call.reject("url is required");
            return;
        }

        new DownloadTask(call).execute(url);
    }

    private class DownloadTask extends AsyncTask<String, Integer, File> {

        private final PluginCall call;
        private String errorMsg;

        DownloadTask(PluginCall call) {
            this.call = call;
        }

        @Override
        protected File doInBackground(String... params) {
            try {
                URL url = new URL(params[0]);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setConnectTimeout(15000);
                conn.setReadTimeout(30000);
                conn.setRequestMethod("GET");
                conn.connect();

                if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
                    errorMsg = "Download failed: HTTP " + conn.getResponseCode();
                    return null;
                }

                int fileLength = conn.getContentLength();
                File cacheDir = getContext().getCacheDir();
                File apkFile = new File(cacheDir, "update.apk");

                InputStream input = conn.getInputStream();
                FileOutputStream output = new FileOutputStream(apkFile);

                byte[] buffer = new byte[4096];
                long total = 0;
                int count;
                while ((count = input.read(buffer)) != -1) {
                    total += count;
                    output.write(buffer, 0, count);
                    if (fileLength > 0) {
                        publishProgress((int) (total * 100 / fileLength));
                    }
                }

                output.close();
                input.close();
                conn.disconnect();

                return apkFile;
            } catch (Exception e) {
                errorMsg = e.getMessage();
                return null;
            }
        }

        @Override
        protected void onProgressUpdate(Integer... values) {
            JSObject ret = new JSObject();
            ret.put("progress", values[0]);
            notifyListeners("downloadProgress", ret);
        }

        @Override
        protected void onPostExecute(File apkFile) {
            if (apkFile == null) {
                call.reject(errorMsg != null ? errorMsg : "Download failed");
                return;
            }

            try {
                Uri apkUri = FileProvider.getUriForFile(
                        getContext(),
                        getContext().getPackageName() + ".fileprovider",
                        apkFile
                );

                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
                intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

                getContext().startActivity(intent);

                JSObject ret = new JSObject();
                ret.put("installing", true);
                call.resolve(ret);
            } catch (Exception e) {
                call.reject("Failed to install: " + e.getMessage());
            }
        }
    }
}
