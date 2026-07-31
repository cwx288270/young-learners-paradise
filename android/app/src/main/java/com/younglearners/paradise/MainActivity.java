package com.younglearners.paradise;

import android.os.Bundle;
import android.content.pm.ActivityInfo;
import android.view.Window;
import android.view.WindowManager;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 锁定竖屏，禁止旋转
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        // 边到边显示：内容延伸到状态栏和导航栏下方
        Window window = getWindow();
        WindowCompat.setDecorFitsSystemWindows(window, false);
        // 状态栏图标深色（浅色背景用）
        WindowInsetsControllerCompat controller = new WindowInsetsControllerCompat(window, getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(true);
    }
}
