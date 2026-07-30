import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'

const AVATAR_OPTIONS = ['🐱', '🐶', '🐰', '🦊', '🐼', '🐨']
const AGE_OPTIONS = [5, 6, 7]

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { children, loadChildren, setCurrentChild, addChild } = useUserStore()
  const [showAddModal, setShowAddModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState(6)
  const [newAvatar, setNewAvatar] = useState('🐱')

  useEffect(() => {
    loadChildren()
  }, [loadChildren])

  const handleSelectChild = (child: typeof children[0]) => {
    setCurrentChild(child)
    navigate('/')
  }

  const handleAddChild = () => {
    if (!newName.trim()) return
    addChild(newName.trim(), newAge, newAvatar)
    setShowAddModal(false)
    setNewName('')
    setNewAge(6)
    setNewAvatar('🐱')
    // 重新加载后自动选最新添加的
    loadChildren()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      {/* Logo & Title */}
      <div className="mb-8 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#5B8DEF] flex items-center justify-center text-5xl shadow-lg">
          🌈
        </div>
        <h1 className="text-2xl font-bold text-[#5B8DEF]">幼小衔接学习乐园</h1>
        <p className="text-sm text-gray-400 mt-1">快乐学习，轻松衔接</p>
      </div>

      {/* Existing Profiles */}
      {children.length > 0 && (
        <div className="w-full max-w-md mb-6">
          <h2 className="text-base font-medium text-gray-600 mb-3">选择小朋友</h2>
          <div className="grid grid-cols-2 gap-3">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => handleSelectChild(child)}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white shadow-md hover:shadow-lg hover:bg-blue-50 transition-all border border-gray-100 min-h-[56px]"
              >
                <span className="text-3xl">{child.avatar}</span>
                <div className="text-left">
                  <p className="font-medium text-gray-700">{child.name}</p>
                  <p className="text-xs text-gray-400">{child.age}岁</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add New Child Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full max-w-md min-h-[56px] rounded-2xl bg-[#5B8DEF] text-white font-medium text-lg shadow-md hover:bg-[#4a7de0] active:scale-[0.97] transition-all flex items-center justify-center gap-2"
      >
        <span className="text-xl">＋</span>
        添加新小朋友
      </button>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">添加新小朋友</h2>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">名字</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="请输入名字"
                className="w-full min-h-[56px] rounded-xl border border-gray-200 px-4 text-lg focus:border-[#5B8DEF] focus:outline-none transition-colors"
                maxLength={10}
              />
            </div>

            {/* Age Selection */}
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">年龄</label>
              <div className="flex gap-2">
                {AGE_OPTIONS.map((age) => (
                  <button
                    key={age}
                    onClick={() => setNewAge(age)}
                    className={`min-h-[56px] flex-1 rounded-xl font-medium text-lg transition-all ${
                      newAge === age
                        ? 'bg-[#5B8DEF] text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {age}岁
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar Selection */}
            <div className="mb-6">
              <label className="block text-sm text-gray-500 mb-1">选择头像</label>
              <div className="flex gap-2 justify-center">
                {AVATAR_OPTIONS.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setNewAvatar(avatar)}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all ${
                      newAvatar === avatar
                        ? 'bg-[#5B8DEF] scale-110 shadow-md ring-2 ring-[#5B8DEF]/30'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="min-h-[56px] flex-1 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-all"
              >
                取消
              </button>
              <button
                onClick={handleAddChild}
                disabled={!newName.trim()}
                className="min-h-[56px] flex-1 rounded-xl bg-[#5B8DEF] text-white font-medium hover:bg-[#4a7de0] disabled:bg-gray-300 disabled:text-gray-500 transition-all"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
