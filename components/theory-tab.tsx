"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { 
  Lock, 
  Star, 
  BookOpen, 
  Music, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  Search,
  Crown,
  Check,
  ArrowRight,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useGame } from "@/lib/game-context"

// 五线谱学习数据
const STAFF_LEARNING = {
  id: 'staff',
  title: '五线谱入门',
  progress: 45,
  completedUnits: 3,
  totalUnits: 8,
  stages: [
    {
      id: 1,
      title: '认识五线谱',
      completed: true,
      current: false,
      subLevels: [
        { id: 1, title: '五线谱的构成', completed: true },
        { id: 2, title: '谱号认识', completed: true },
        { id: 3, title: '音符位置', completed: true },
        { id: 4, title: '阶段测试', completed: true },
      ]
    },
    {
      id: 2,
      title: '节奏与节拍',
      completed: false,
      current: true,
      subLevels: [
        { id: 1, title: '音符时值', completed: true },
        { id: 2, title: '拍号认识', completed: true },
        { id: 3, title: '常见节奏型', completed: false, current: true },
        { id: 4, title: '休止符', completed: false },
        { id: 5, title: '阶段测试', completed: false },
      ]
    },
    {
      id: 3,
      title: '音程与和弦',
      completed: false,
      current: false,
      locked: true,
      subLevels: [
        { id: 1, title: '音程基础', completed: false },
        { id: 2, title: '和弦入门', completed: false },
        { id: 3, title: '和弦类型', completed: false },
        { id: 4, title: '阶段测试', completed: false },
      ]
    },
    {
      id: 4,
      title: '综合测试',
      completed: false,
      current: false,
      locked: true,
      subLevels: [
        { id: 1, title: '综合练习', completed: false },
        { id: 2, title: '最终测试', completed: false },
      ]
    },
  ]
}

// 简谱学习数据
const JIANPU_LEARNING = {
  id: 'jianpu',
  title: '简谱入门',
  progress: 20,
  completedUnits: 1,
  totalUnits: 5,
}

// 工尺谱学习数据（锁定）
const GONGCHE_LEARNING = {
  id: 'gongche',
  title: '工尺谱入门',
  locked: true,
}

// 错题数量
const WRONG_QUESTIONS_COUNT = 5

// ==================== 乐理主界面 ====================
interface TheoryMainPageProps {
  onNavigateToStaff: () => void
  onNavigateToJianpu: () => void
  onNavigateToDict: () => void
  onNavigateToWrongBook: () => void
  onBack: () => void
}

function TheoryMainPage({ 
  onNavigateToStaff, 
  onNavigateToJianpu, 
  onNavigateToDict,
  onNavigateToWrongBook,
  onBack 
}: TheoryMainPageProps) {
  const [showToast, setShowToast] = useState(false)

  const handleGongcheClick = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-2 rounded-lg text-sm shadow-lg">
          完成五线谱和简谱后解锁
        </div>
      )}

      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">乐理知识</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-4">
        {/* 五线谱学习卡片 */}
        <Card 
          className="overflow-hidden cursor-pointer hover:shadow-lg transition-all"
          onClick={onNavigateToStaff}
        >
          <div className="h-2 bg-gradient-to-r from-[#A8D5BA] to-[#B4C7E8]" />
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#A8D5BA]/20 flex items-center justify-center">
                <Music className="w-7 h-7 text-[#A8D5BA]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">五线谱学习</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>学习进度 {STAFF_LEARNING.progress}%</span>
                </div>
                <Progress value={STAFF_LEARNING.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  已学 {STAFF_LEARNING.completedUnits}/{STAFF_LEARNING.totalUnits} 单元
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* 简谱学习卡片 */}
        <Card 
          className="overflow-hidden cursor-pointer hover:shadow-lg transition-all"
          onClick={onNavigateToJianpu}
        >
          <div className="h-2 bg-gradient-to-r from-[#FFD4A3] to-[#E8B4D4]" />
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#FFD4A3]/20 flex items-center justify-center text-2xl font-bold text-[#FFD4A3]">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">简谱学习</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>学习进度 {JIANPU_LEARNING.progress}%</span>
                </div>
                <Progress value={JIANPU_LEARNING.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  已学 {JIANPU_LEARNING.completedUnits}/{JIANPU_LEARNING.totalUnits} 单元
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* 工尺谱学习卡片（锁定） */}
        <Card 
          className="overflow-hidden opacity-60 cursor-pointer"
          onClick={handleGongcheClick}
        >
          <div className="h-2 bg-muted" />
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-xl font-serif text-muted-foreground">
                上
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 text-muted-foreground">工尺谱学习</h3>
                <p className="text-sm text-muted-foreground">即将解锁</p>
              </div>
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* 功能卡片横向排列 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 音乐词典 */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all"
            onClick={onNavigateToDict}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#B4C7E8]/20 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-[#B4C7E8]" />
              </div>
              <h3 className="font-semibold mb-1">音乐词典</h3>
              <p className="text-xs text-muted-foreground">术语/符号查询</p>
            </CardContent>
          </Card>

          {/* 错题本 */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all relative"
            onClick={onNavigateToWrongBook}
          >
            {WRONG_QUESTIONS_COUNT > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                {WRONG_QUESTIONS_COUNT}
              </div>
            )}
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#E8B4D4]/20 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-[#E8B4D4]" />
              </div>
              <h3 className="font-semibold mb-1">错题本</h3>
              <p className="text-xs text-muted-foreground">复习易错题目</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ==================== 五线谱学习地图 ====================
interface StaffLearningMapProps {
  onBack: () => void
}

function StaffLearningMap({ onBack }: StaffLearningMapProps) {
  const [showSheet, setShowSheet] = useState(false)
  const [selectedStage, setSelectedStage] = useState<typeof STAFF_LEARNING.stages[number] | null>(null)
  const [showToast, setShowToast] = useState<string | null>(null)

  const handleStageClick = (stage: typeof STAFF_LEARNING.stages[number]) => {
    if (stage.locked) {
      setShowToast(`请先完成第 ${stage.id - 1} 关`)
      setTimeout(() => setShowToast(null), 2000)
      return
    }
    
    if (stage.completed) {
      // 已完成的关卡，展开底部Sheet
      setSelectedStage(stage)
      setShowSheet(true)
    } else if (stage.current) {
      // 当前进行中的关卡，直接进入未完成的小关
      // TODO: 跳转到知识点学习页
    }
  }

  const handleContinueLearning = () => {
    // 跳转到当前未完成的最小关卡
    // TODO: 实现跳转逻辑
  }

  const completedStages = STAFF_LEARNING.stages.filter(s => s.completed).length

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-2 rounded-lg text-sm shadow-lg">
          {showToast}
        </div>
      )}

      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">五线谱入门</h1>
        {/* 圆环进度 */}
        <div className="relative w-10 h-10">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-muted"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${(completedStages / STAFF_LEARNING.stages.length) * 100} 100`}
              strokeLinecap="round"
              className="text-[#A8D5BA]"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium">
            {completedStages}/{STAFF_LEARNING.stages.length}
          </span>
        </div>
      </div>

      {/* 关卡地图 */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        <div className="relative">
          {/* 关卡节点 - 缩小1/3，移除连接曲线 */}
          <div className="relative" style={{ height: `${STAFF_LEARNING.stages.length * 120}px` }}>
            {STAFF_LEARNING.stages.map((stage, index) => {
              const isLeft = index % 2 === 0
              
              return (
                <div
                  key={stage.id}
                  className={cn(
                    "absolute flex flex-col items-center transition-all",
                    isLeft ? "left-4" : "right-4"
                  )}
                  style={{ top: `${index * 120}px` }}
                >
                  {/* 关卡圆形卡片 - 80px */}
                  <button
                    onClick={() => handleStageClick(stage)}
                    className={cn(
                      "w-[80px] h-[80px] rounded-full border-[3px] flex flex-col items-center justify-center transition-all relative",
                      stage.completed && "bg-[#A8D5BA]/10 border-[#A8D5BA] shadow-lg",
                      stage.current && "bg-[#B4C7E8]/10 border-[#B4C7E8] shadow-lg animate-pulse",
                      stage.locked && "bg-muted border-muted-foreground/30"
                    )}
                  >
                    {/* 已完成：皇冠图标 */}
                    {stage.completed && (
                      <Crown className="w-5 h-5 text-[#FFD700] fill-[#FFD700] mb-0.5" />
                    )}
                    
                    {/* 进行中：脉冲动画 */}
                    {stage.current && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-[#B4C7E8]/30 animate-ping" />
                        <Music className="w-5 h-5 text-[#B4C7E8] mb-0.5 relative z-10" />
                      </>
                    )}
                    
                    {/* 锁定：锁图标 */}
                    {stage.locked && (
                      <Lock className="w-5 h-5 text-muted-foreground mb-0.5" />
                    )}
                    
                    <span className={cn(
                      "text-xs font-medium text-center px-1 leading-tight",
                      stage.locked && "text-muted-foreground"
                    )}>
                      {stage.title}
                    </span>
                  </button>

                  {/* 小关进度星星 - 位于圆形卡片正下方，贴近但不重合 */}
                  <div className="flex justify-center gap-1 mt-1">
                    {stage.subLevels.map((sub) => (
                      <Star
                        key={sub.id}
                        className={cn(
                          "w-3.5 h-3.5 transition-all",
                          sub.completed && "text-[#FFD700] fill-[#FFD700]",
                          sub.current && "text-[#B4C7E8] fill-[#B4C7E8] animate-bounce",
                          !sub.completed && !sub.current && "text-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 底部固定按钮 */}
      <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
        <Button 
          className="w-full h-12 text-base font-medium bg-[#A8D5BA] hover:bg-[#A8D5BA]/90"
          onClick={handleContinueLearning}
        >
          继续学习
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* 底部 Sheet 弹窗 */}
      {showSheet && selectedStage && (
        <>
          {/* 遮罩 */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowSheet(false)}
          />
          
          {/* Sheet */}
          <div className="fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl z-50 max-h-[70vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Sheet 顶部 */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
                <h3 className="font-semibold">{selectedStage.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                  <span className="text-sm font-medium">{selectedStage.subLevels.length * 3}</span>
                </div>
                <button 
                  onClick={() => setShowSheet(false)}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 小关列表 */}
            <div className="overflow-y-auto max-h-[50vh] p-4 space-y-3">
              {selectedStage.subLevels.map((sub, index) => (
                <div
                  key={sub.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-all",
                    sub.completed && "bg-[#A8D5BA]/10 border-[#A8D5BA]/30 cursor-pointer hover:shadow-md",
                    sub.current && "bg-[#B4C7E8]/10 border-[#B4C7E8]/30 cursor-pointer hover:shadow-md",
                    !sub.completed && !sub.current && "opacity-50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-medium",
                    sub.completed && "bg-[#A8D5BA] text-white",
                    sub.current && "bg-[#B4C7E8] text-white",
                    !sub.completed && !sub.current && "bg-muted text-muted-foreground"
                  )}>
                    {sub.completed ? (
                      <Check className="w-5 h-5" />
                    ) : sub.current ? (
                      <ArrowRight className="w-5 h-5" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{index + 1}. {sub.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {sub.completed ? '已完成 - 点击重新练习' : sub.current ? '进行中' : '未解锁'}
                    </p>
                  </div>
                  {sub.completed && (
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(i => (
                        <Star key={i} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ==================== 音乐词典页面 ====================
function MusicDictionary({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">音乐词典</h1>
        <div className="w-10" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">音乐词典功能开发中...</p>
      </div>
    </div>
  )
}

// ==================== 错题本页面 ====================
function WrongBook({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">错题本</h1>
        <div className="w-10" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">错题本功能开发中...</p>
      </div>
    </div>
  )
}

// ==================== 简谱学习地图 ====================
function JianpuLearningMap({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">简谱入门</h1>
        <div className="w-10" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">简谱学习功能开发中...</p>
      </div>
    </div>
  )
}

// ==================== 主组件 ====================
type TheoryView = 'main' | 'staff' | 'jianpu' | 'dict' | 'wrongbook'

export function TheoryTab() {
  const { setCurrentTab } = useGame()
  const [currentView, setCurrentView] = useState<TheoryView>('main')

  const handleBack = () => {
    if (currentView === 'main') {
      setCurrentTab('home')
    } else {
      setCurrentView('main')
    }
  }

  if (currentView === 'staff') {
    return <StaffLearningMap onBack={handleBack} />
  }

  if (currentView === 'jianpu') {
    return <JianpuLearningMap onBack={handleBack} />
  }

  if (currentView === 'dict') {
    return <MusicDictionary onBack={handleBack} />
  }

  if (currentView === 'wrongbook') {
    return <WrongBook onBack={handleBack} />
  }

  return (
    <TheoryMainPage
      onNavigateToStaff={() => setCurrentView('staff')}
      onNavigateToJianpu={() => setCurrentView('jianpu')}
      onNavigateToDict={() => setCurrentView('dict')}
      onNavigateToWrongBook={() => setCurrentView('wrongbook')}
      onBack={handleBack}
    />
  )
}
