import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Unlock: React.FC = () => {
  const navigate = useNavigate()
  const [pin, setPin] = useState<string[]>(['', '', '', ''])
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const correctPin = '1234'

  const handleKeyPress = (num: string) => {
    setError(false)
    const idx = pin.findIndex(p => p === '')
    if (idx === -1) return

    const newPin = [...pin]
    newPin[idx] = num
    setPin(newPin)

    if (idx === 3) {
      if (newPin.join('') === correctPin) {
        navigate('/parent')
      } else {
        setError(true)
        setShake(true)
        setTimeout(() => {
          setPin(['', '', '', ''])
          setShake(false)
        }, 600)
      }
    }
  }

  const handleDelete = () => {
    const lastIdx = [...pin].reverse().findIndex(p => p !== '')
    if (lastIdx === -1) return
    const newPin = [...pin]
    newPin[3 - lastIdx] = ''
    setPin(newPin)
    setError(false)
  }

  const filledCount = pin.filter(p => p !== '').length

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #F0F4FF 0%, #FFFFFF 100%)' }}>
      {/* 顶部 */}
      <div className="px-5 py-4">
        <button onClick={() => navigate(-1)} className="btn-child px-4 bg-white/80 text-gray-500">← 返回</button>
      </div>

      {/* 主体 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-12">
        {/* 图标 */}
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: 'linear-gradient(135deg, #5B8DEF, #74B9FF)', boxShadow: '0 8px 24px rgba(91,141,239,0.25)' }}>
          <span className="text-4xl">🔒</span>
        </div>

        <h2 className="text-xl font-bold text-gray-700 mb-1">家长验证</h2>
        <p className="text-sm text-gray-400 mb-8">请输入密码进入家长模式</p>

        {/* PIN 显示 */}
        <div className={`flex gap-3 mb-4 ${shake ? 'gentle-shake' : ''}`}>
          {pin.map((digit, idx) => (
            <div key={idx}
              className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all"
              style={{
                borderColor: error ? '#FF6B6B' : digit ? '#5B8DEF' : '#E8ECF1',
                backgroundColor: error ? '#FFF0F0' : digit ? '#EBF0FF' : '#fff',
                boxShadow: digit ? '0 2px 8px rgba(91,141,239,0.15)' : 'none',
              }}>
              {digit ? (
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#5B8DEF' }} />
              ) : (
                <div className="w-2 h-2 rounded-full bg-gray-200" />
              )}
            </div>
          ))}
        </div>

        {/* 错误提示 */}
        {error ? (
          <p className="text-sm text-red-400 mb-4 animate-pulse">密码不正确，请重试</p>
        ) : (
          <p className="text-xs text-gray-300 mb-4">默认密码：1234</p>
        )}

        {/* 数字键盘 */}
        <div className="grid grid-cols-3 gap-3 w-72">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((key) => {
            if (key === '') return <div key="empty" />
            if (key === 'del') {
              return (
                <button key="del" onClick={handleDelete}
                  className="h-14 rounded-xl bg-gray-100 text-gray-500 font-medium hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center">
                  <span className="text-sm">删除</span>
                </button>
              )
            }
            return (
              <button key={key} onClick={() => handleKeyPress(key)}
                className="h-14 rounded-xl bg-white border-2 border-gray-100 text-gray-700 font-bold text-xl
                  hover:border-blue-200 hover:bg-blue-50 active:scale-95 transition-all shadow-sm flex items-center justify-center">
                {key}
              </button>
            )
          })}
        </div>

        {/* 进度提示 */}
        <div className="flex gap-2 mt-6">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="w-2 h-2 rounded-full transition-all"
              style={{ backgroundColor: i < filledCount ? '#5B8DEF' : '#E8ECF1' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Unlock
