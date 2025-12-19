import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '@/components/SearchInput';
import { AIProcessingTimeline } from '@/components/AIProcessingTimeline';
import { ResultsDisplay, VideoResult } from '@/components/ResultsDisplay';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const MOCK_RESULTS: VideoResult[] = [
  {
    id: '1',
    title: 'Dynamic Programming Full Course - From Beginner to Advanced',
    description: 'Complete guide to Dynamic Programming covering all patterns, from basic recursion to advanced optimization techniques with C++ implementations.',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop',
    type: 'playlist',
    score: 9.4,
    url: 'https://youtube.com/playlist?list=example1',
    channel: 'Code Academy',
  },
  {
    id: '2',
    title: 'Understanding DP: The Mental Model You Need',
    description: 'Learn the intuition behind dynamic programming - why it works, when to use it, and how to identify DP problems in interviews.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop',
    type: 'video',
    score: 9.1,
    url: 'https://youtube.com/watch?v=example2',
    channel: 'Tech Interview Pro',
  },
  {
    id: '3',
    title: 'DSA Masterclass: DP Problems in C++',
    description: 'Comprehensive playlist covering 50+ dynamic programming problems with detailed C++ solutions and complexity analysis.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    type: 'playlist',
    score: 8.9,
    url: 'https://youtube.com/playlist?list=example3',
    channel: 'Algorithm Masters',
  },
  {
    id: '4',
    title: 'DP on Trees & Graphs - Advanced Patterns',
    description: 'Advanced dynamic programming techniques applied to tree and graph problems, essential for competitive programming.',
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=225&fit=crop',
    type: 'video',
    score: 8.7,
    url: 'https://youtube.com/watch?v=example4',
    channel: 'Competitive Coding Hub',
  },
  {
    id: '5',
    title: 'LeetCode DP Problems Explained - Hindi',
    description: 'Top 20 LeetCode dynamic programming problems explained in Hindi with step-by-step approach and code walkthrough.',
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=225&fit=crop',
    type: 'video',
    score: 8.5,
    url: 'https://youtube.com/watch?v=example5',
    channel: 'CodeWithDesi',
  },
];

type SearchState = 'idle' | 'processing' | 'results';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [currentStage, setCurrentStage] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const [results, setResults] = useState<VideoResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate AI processing stages
  const simulateProcessing = useCallback(() => {
    setSearchState('processing');
    setCurrentStage(0);
    setStageProgress(0);

    const stageDurations = [1500, 2000, 1800, 2200]; // Duration for each stage in ms
    let currentStageIndex = 0;

    const processStage = () => {
      if (currentStageIndex >= 4) {
        // All stages complete
        setTimeout(() => {
          setResults(MOCK_RESULTS);
          setSearchState('results');
        }, 500);
        return;
      }

      setCurrentStage(currentStageIndex);
      setStageProgress(0);

      const duration = stageDurations[currentStageIndex];
      const steps = 20;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const progressInterval = setInterval(() => {
        currentStep++;
        setStageProgress((currentStep / steps) * 100);

        if (currentStep >= steps) {
          clearInterval(progressInterval);
          currentStageIndex++;
          setTimeout(processStage, 300);
        }
      }, stepDuration);
    };

    processStage();
  }, []);

  const handleSearch = useCallback((query: string, languages: string[]) => {
    // This is where backend integration would happen
    console.log('Search payload:', { query, languages });
    setSearchQuery(query);
    simulateProcessing();
  }, [simulateProcessing]);

  const handleNewSearch = () => {
    setSearchState('idle');
    setResults([]);
    setCurrentStage(0);
    setStageProgress(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">AI YouTube Discovery</span>
          </div>

          <div className="w-16" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {searchState === 'idle' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-12"
            >
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  What do you want to learn?
                </h1>
                <p className="text-muted-foreground text-lg">
                  Describe your learning goal and we'll find the best content for you
                </p>
              </div>
              <SearchInput onSearch={handleSearch} />
            </motion.div>
          )}

          {searchState === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-12"
            >
              <AIProcessingTimeline
                currentStage={currentStage}
                stageProgress={stageProgress}
              />
            </motion.div>
          )}

          {searchState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">
                    Results for "{searchQuery}"
                  </h2>
                  <p className="text-muted-foreground">
                    {results.length} items found, sorted by AI score
                  </p>
                </div>
                <Button variant="glass" onClick={handleNewSearch}>
                  New Search
                </Button>
              </div>

              <ResultsDisplay results={results} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
