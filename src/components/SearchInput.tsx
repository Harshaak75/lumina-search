import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ru', name: 'Russian' },
];

interface SearchInputProps {
  onSearch: (query: string, languages: string[]) => void;
  isLoading?: boolean;
}

export function SearchInput({ onSearch, isLoading = false }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['en']);
  const [showLanguages, setShowLanguages] = useState(false);

  const toggleLanguage = (code: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(code)
        ? prev.filter((l) => l !== code)
        : [...prev, code]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && selectedLanguages.length > 0) {
      onSearch(query.trim(), selectedLanguages);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="What do you want to learn? e.g., 'DSA DP in C++'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-4 h-14 text-base rounded-2xl shadow-soft-lg focus:shadow-glow"
            disabled={isLoading}
          />
        </div>

        {/* Language Selector */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setShowLanguages(!showLanguages)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>Language preferences</span>
            <span className="text-primary font-medium">({selectedLanguages.length} selected)</span>
          </button>

          {showLanguages && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2"
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => toggleLanguage(lang.code)}
                  className={`
                    px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                    ${selectedLanguages.includes(lang.code)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }
                  `}
                >
                  {lang.name}
                </button>
              ))}
            </motion.div>
          )}

          {/* Selected Languages Display */}
          {selectedLanguages.length > 0 && !showLanguages && (
            <div className="flex flex-wrap gap-2">
              {selectedLanguages.map((code) => {
                const lang = LANGUAGES.find((l) => l.code === code);
                return (
                  <Badge
                    key={code}
                    variant="secondary"
                    className="flex items-center gap-1 cursor-pointer hover:bg-secondary/80"
                    onClick={() => toggleLanguage(code)}
                  >
                    {lang?.name}
                    <X className="w-3 h-3" />
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={isLoading || !query.trim() || selectedLanguages.length === 0}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Search Intelligently
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
