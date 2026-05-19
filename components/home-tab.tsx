"use client"

import { useGame, CHAPTERS } from "@/lib/game-context"
import type { Level } from "@/lib/question-engine"
import { classifyVoiceType, type VoiceTypeInfo } from "@/lib/voice-type"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import {
  Star,
  Trophy,
  Flame,
  Music2,
  ChevronRight,
  Calendar,
  Target,
  TrendingUp,
  Sparkles,
  Settings,
  Mic,
  Wand2,
  RefreshCw,
  Repeat,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Personality } from "./singti/data"
import { CharacterAvatar } from "./singti/character-avatar"

// 主页模块配置 — 与教程地图一致
const HOME_MODULES = [
  { id: 'pitch-recognition', title: '音高听辩', color: '#E8956A', bgColor: '#FFE4D6' },
  { id: 'interval-dictation', title: '音程听写', color: '#5AB88A', bgColor: '#D6F5E6' },
  { id: 'rhythm-training', title: '节奏训练', color: '#8B7FD4', bgColor: '#E6E4FF' },
  { id: 'listen-and-sing', title: '听音跟唱', color: '#E87FA0', bgColor: '#FFE4EC' },
  { id: 'ai-song-learning', title: 'AI+音色整曲学习', color: '#5AAAE8', bgColor: '#E4F4FF' },
]

const SESSION_MODULE_IDS = ['pitch-recognition', 'interval-dictation', 'listen-and-sing']
const STORAGE_KEY_PREFIX = 'module-level-state-'

function loadHomeModuleState(moduleId: string): { currentLevel: string; points: number; masteredLevels: string[] } {
  if (typeof window === 'undefined') return { currentLevel: 'L1', points: 0, masteredLevels: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + moduleId)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { currentLevel: 'L1', points: 0, masteredLevels: [] }
}

interface HomeTabProps {
  onStartAssessment?: () => void
  onOpenSingTI?: () => void
  onOpenVocalRangeTest?: () => void
  singTIPersonality?: Personality | null
}

export function HomeTab({ onStartAssessment, onOpenSingTI, onOpenVocalRangeTest, singTIPersonality }: HomeTabProps) {
  const { progress, profile, setCurrentTab, resetProgress } = useGame()

  // 声部分类
  const voiceType: VoiceTypeInfo | null = profile.vocalRange && profile.gender
    ? classifyVoiceType(profile.vocalRange.lowest, profile.vocalRange.highest, profile.gender)
    : null

  // 计算模块统计
  const activeModules = HOME_MODULES.filter(m => {
    if (SESSION_MODULE_IDS.includes(m.id)) {
      const state = loadHomeModuleState(m.id)
      return state.points > 0
    }
    return true
  }).length
  
  // 今日练习数据(模拟)
  const todayPractice = {
    time: 15,
    exercises: 8,
    accuracy: 78,
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">你好，音乐家</h1>
            <p className="text-muted-foreground text-sm">继续你的音乐之旅</p>
          </div>
          <button
            onClick={() => {
              if (confirm('确定要重置所有进度吗？')) {
                resetProgress()
              }
            }}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-secondary rounded-xl p-3 text-center">
            <Flame className="w-5 h-5 mx-auto mb-1 text-[#E8A0A0]" />
            <p className="text-lg font-bold">{progress.streak}</p>
            <p className="text-xs text-muted-foreground">连续天数</p>
          </div>
          <div className="bg-secondary rounded-xl p-3 text-center">
            <Target className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold">{todayPractice.exercises}</p>
            <p className="text-xs text-muted-foreground">今日练习</p>
          </div>
          <div className="bg-secondary rounded-xl p-3 text-center">
            <Trophy className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold">{activeModules}/{HOME_MODULES.length}</p>
            <p className="text-xs text-muted-foreground">进行中</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-4">
        {/* SingTI Card */}
        <Card className="overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                <CardTitle className="text-base">SingTI 音乐人格</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {singTIPersonality ? (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <CharacterAvatar personality={singTIPersonality} size={48} />
                  <div>
                    <p className="text-sm font-bold text-foreground">{singTIPersonality.name}</p>
                    <p className="text-xs text-muted-foreground">{singTIPersonality.tagline}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {singTIPersonality.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={onOpenSingTI}
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> 重新测试
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  唱一段《小星星》，回答 16 道题，解锁你的专属音乐人格
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={onOpenSingTI}
                >
                  <Wand2 className="w-4 h-4 mr-2" /> 测测你的 SingTI
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Self Assessment Card */}
        <Card className="overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[#A8D5BA] to-[#B4C7E8]" />
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-[#A8D5BA]" />
              <CardTitle className="text-base">自我评估</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              {profile.assessmentResults 
                ? '查看你的音乐能力评估报告，了解你的优势和提升空间'
                : '通过专业测试了解你的音准、节奏和音域能力'
              }
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={onStartAssessment}
            >
              <Mic className="w-4 h-4 mr-2" />
              {profile.assessmentResults ? '重新评估' : '开始评估'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Vocal Range Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Music2 className="w-5 h-5 text-primary" />
              <CardTitle className="text-base">我的音域</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {voiceType ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">最低音</p>
                    <p className="text-lg font-bold">{profile.vocalRange?.lowest}</p>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 relative">
                      {profile.vocalRange && (() => {
                        const NOTES = ['C2','D2','E2','F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6']
                        const li = NOTES.indexOf(profile.vocalRange!.lowest)
                        const hi = NOTES.indexOf(profile.vocalRange!.highest)
                        return (
                          <div
                            className="absolute inset-y-0 rounded-full bg-accent/40"
                            style={{ left: `${Math.max(0, (li / (NOTES.length - 1)) * 100)}%`, right: `${Math.max(0, 100 - (hi / (NOTES.length - 1)) * 100)}%` }}
                          />
                        )
                      })()}
                    </div>
                    <div className="flex justify-between text-[8px] text-muted-foreground/60 mt-0.5 px-0.5">
                      <span>C2</span>
                      <span>C3</span>
                      <span>C4</span>
                      <span>C5</span>
                      <span>C6</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">最高音</p>
                    <p className="text-lg font-bold">{profile.vocalRange?.highest}</p>
                  </div>
                </div>

                {/* Voice type badge */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {voiceType.icon} {voiceType.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{voiceType.labelEn}</span>
                </div>
                <p className="text-xs text-center text-muted-foreground mb-3">
                  典型音域 {voiceType.typicalRange} · {voiceType.description}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  尚未检测音域，完成测试了解你的声部类型
                </p>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={onOpenVocalRangeTest}
            >
              <Repeat className="w-4 h-4 mr-2" />
              {profile.vocalRange ? '重新测试' : '开始测试'}
            </Button>
          </CardContent>
        </Card>

        {/* Today's Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                <CardTitle className="text-base">今日练习</CardTitle>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{todayPractice.time}</p>
                <p className="text-xs text-muted-foreground">分钟</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{todayPractice.exercises}</p>
                <p className="text-xs text-muted-foreground">练习题</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{todayPractice.accuracy}%</p>
                <p className="text-xs text-muted-foreground">准确率</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">每日目标</span>
                <span className="font-medium">15/30 分钟</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Learning Path Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-chart-2" />
              <CardTitle className="text-base">学习进度</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {HOME_MODULES.map(mod => {
                // 闯关模块（音高听辩/音程听写/听音跟唱）→ localStorage 等级
                if (SESSION_MODULE_IDS.includes(mod.id)) {
                  const state = loadHomeModuleState(mod.id)
                  const hasActivity = state.points > 0 || state.currentLevel !== 'L1'
                  const levelNum = ({ L1: 1, L2: 2, L3: 3 } as Record<string, number>)[state.currentLevel] || 1
                  const isMastered = state.masteredLevels.includes('L3')
                  const pct = isMastered ? 100 : hasActivity ? (levelNum / 3) * 100 : 0
                  return (
                    <div key={mod.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: hasActivity ? mod.color : '#E8DDD5', color: hasActivity ? '#4A3728' : '#8B7355' }}>
                        {mod.id === 'pitch-recognition' ? '音' : mod.id === 'interval-dictation' ? '程' : '唱'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-sm mb-1">
                          <span className={cn(!hasActivity && "text-muted-foreground")}>{mod.title}</span>
                          <span className="text-muted-foreground">{isMastered ? '已掌握' : hasActivity ? state.currentLevel : '未开始'}</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: mod.color }} />
                        </div>
                      </div>
                    </div>
                  )
                }
                // 节奏训练 → 始终可用
                if (mod.id === 'rhythm-training') {
                  return (
                    <div key={mod.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: mod.color, color: '#4A3728' }}>
                        节
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{mod.title}</span>
                          <span className="text-muted-foreground">已解锁</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '100%', backgroundColor: mod.color, opacity: 0.3 }} />
                        </div>
                      </div>
                    </div>
                  )
                }
                // AI整曲学习 → 使用旧章节进度
                const chapter = progress.chapters[5]
                const pct = chapter ? Math.min(100, (chapter.totalStars / 15) * 100) : 0
                return (
                  <div key={mod.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: mod.color, color: '#4A3728' }}>
                      AI
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{mod.title}</span>
                        <span className="text-muted-foreground">{Math.round(pct)}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: mod.color }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <Button
              className="w-full mt-4"
              onClick={() => setCurrentTab('tutorial')}
            >
              <Target className="w-4 h-4 mr-2" />
              继续练习
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {progress.practiceHistory.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">最近练习</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {progress.practiceHistory.slice(-3).reverse().map((record, i) => {
                  const chapter = CHAPTERS.find(c => c.id === record.chapterId)
                  return (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: chapter?.color }}
                        />
                        <span className="text-sm">{chapter?.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[0, 1, 2].map(j => (
                            <Star
                              key={j}
                              className={cn(
                                "w-3 h-3",
                                j < record.stars
                                  ? "fill-[var(--star-gold)] text-[var(--star-gold)]"
                                  : "text-[var(--star-empty)]"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {record.accuracy.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
