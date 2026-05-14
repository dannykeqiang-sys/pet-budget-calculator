import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { getScenarioById } from '@/config'

export default function HistoryPage() {
  const { history, removeFromHistory, clearHistory } = useStore()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">
              📋 模拟历史
            </h1>
            <p className="text-muted-foreground text-sm">
              回顾你探索过的每一个决策场景
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs text-coral hover:underline"
            >
              清空全部
            </button>
          )}
        </div>
      </motion.div>

      {history.length === 0 ? (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-5xl mb-4">📭</div>
          <p className="text-muted-foreground mb-4">还没有模拟记录</p>
          <Link to="/" className="btn-primary inline-block text-sm">
            开始探索
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {history.map((item, i) => {
            const scenario = getScenarioById(item.scenarioId)
            if (!scenario) return null
            return (
              <motion.div
                key={`${item.scenarioId}-${item.createdAt}`}
                className="card-base p-4 flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/scenario/${scenario.category}/${scenario.slug}`}
                  className="flex items-center gap-4 flex-1 min-w-0"
                >
                  <div className="text-2xl">{scenario.emoji}</div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm">{scenario.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {scenario.category} · {new Date(item.createdAt).toLocaleDateString('zh-CN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => removeFromHistory(item.scenarioId)}
                  className="text-xs text-muted-foreground hover:text-coral transition-colors ml-3 shrink-0"
                >
                  删除
                </button>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
