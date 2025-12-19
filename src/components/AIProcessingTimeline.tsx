import { motion } from 'framer-motion';
import { Brain, Search, Filter, BarChart3, Check } from 'lucide-react';

interface ProcessingStage {
  id: number;
  title: string;
  explanation: string;
  icon: React.ReactNode;
  colorClass: string;
  glowClass: string;
}

const stages: ProcessingStage[] = [
  {
    id: 1,
    title: 'Understanding Intent',
    explanation: 'We analyze what the user really wants, not just keywords.',
    icon: <Brain className="w-5 h-5" />,
    colorClass: 'bg-stage-intent',
    glowClass: 'glow-intent',
  },
  {
    id: 2,
    title: 'Discovering Videos & Playlists',
    explanation: 'We fetch candidate content from YouTube.',
    icon: <Search className="w-5 h-5" />,
    colorClass: 'bg-stage-discover',
    glowClass: 'glow-discover',
  },
  {
    id: 3,
    title: 'Intelligent Filtering',
    explanation: 'Removing irrelevant, low-quality, or mismatched content.',
    icon: <Filter className="w-5 h-5" />,
    colorClass: 'bg-stage-filter',
    glowClass: 'glow-filter',
  },
  {
    id: 4,
    title: 'AI Scoring & Ranking',
    explanation: 'We rank content based on learning value, structure, consistency, and relevance.',
    icon: <BarChart3 className="w-5 h-5" />,
    colorClass: 'bg-stage-score',
    glowClass: 'glow-score',
  },
];

interface AIProcessingTimelineProps {
  currentStage: number;
  stageProgress: number;
}

export function AIProcessingTimeline({ currentStage, stageProgress }: AIProcessingTimelineProps) {
  return (
    <div className="w-full max-w-xl mx-auto py-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold text-center mb-8 text-foreground"
      >
        AI is processing your request
      </motion.h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        {stages.map((stage, index) => {
          const isCompleted = index < currentStage;
          const isActive = index === currentStage;
          const isPending = index > currentStage;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start mb-8 last:mb-0"
            >
              {/* Icon container */}
              <div
                className={`
                  relative z-10 flex items-center justify-center w-12 h-12 rounded-full 
                  transition-all duration-500
                  ${isCompleted ? `${stage.colorClass} text-primary-foreground` : ''}
                  ${isActive ? `${stage.colorClass} text-primary-foreground ${stage.glowClass} animate-pulse-soft` : ''}
                  ${isPending ? 'bg-secondary text-muted-foreground' : ''}
                `}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : stage.icon}
              </div>

              {/* Content */}
              <div className="ml-4 flex-1">
                <h3
                  className={`
                    font-medium transition-colors duration-300
                    ${isCompleted || isActive ? 'text-foreground' : 'text-muted-foreground'}
                  `}
                >
                  {stage.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {stage.explanation}
                </p>

                {/* Progress bar */}
                {(isActive || isCompleted) && (
                  <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isCompleted ? '100%' : `${stageProgress}%` }}
                      transition={{ duration: 0.3 }}
                      className={`h-full rounded-full ${stage.colorClass}`}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
