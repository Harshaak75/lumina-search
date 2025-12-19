import { motion } from 'framer-motion';
import { ExternalLink, Play, ListVideo, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface VideoResult {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  type: 'video' | 'playlist';
  score: number;
  url: string;
  channel: string;
}

interface ResultCardProps {
  result: VideoResult;
  index: number;
}

function ResultCard({ result, index }: ResultCardProps) {
  const handleClick = () => {
    window.open(result.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card
        variant="elevated"
        className="group cursor-pointer overflow-hidden hover:scale-[1.02] transition-all duration-300"
        onClick={handleClick}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Thumbnail */}
          <div className="relative w-full sm:w-48 h-32 sm:h-28 flex-shrink-0 overflow-hidden">
            <img
              src={result.thumbnail}
              alt={result.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {result.type === 'video' ? (
                  <Play className="w-10 h-10 text-primary-foreground drop-shadow-lg" />
                ) : (
                  <ListVideo className="w-10 h-10 text-primary-foreground drop-shadow-lg" />
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant={result.type === 'video' ? 'video' : 'playlist'}>
                    {result.type === 'video' ? 'Video' : 'Playlist'}
                  </Badge>
                  <Badge variant="score" className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {result.score.toFixed(1)}
                  </Badge>
                </div>
                <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {result.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {result.channel}
                </p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {result.description}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

interface ResultsDisplayProps {
  results: VideoResult[];
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const playlists = results.filter((r) => r.type === 'playlist');
  const videos = results.filter((r) => r.type === 'video');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto py-8"
    >
      {/* Playlists Section */}
      {playlists.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <ListVideo className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground">
              Playlists ({playlists.length})
            </h2>
          </div>
          <div className="space-y-4">
            {playlists.map((result, index) => (
              <ResultCard key={result.id} result={result} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Videos Section */}
      {videos.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Play className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Videos ({videos.length})
            </h2>
          </div>
          <div className="space-y-4">
            {videos.map((result, index) => (
              <ResultCard key={result.id} result={result} index={index + playlists.length} />
            ))}
          </div>
        </section>
      )}

      {results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No results found. Try a different query.</p>
        </div>
      )}
    </motion.div>
  );
}
