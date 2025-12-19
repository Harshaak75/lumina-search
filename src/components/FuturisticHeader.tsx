import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hexagon, Sparkles } from 'lucide-react';

export function FuturisticHeader() {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-6 mt-4">
        <div className="max-w-6xl mx-auto px-6 py-4 rounded-2xl bg-card/30 backdrop-blur-xl border border-border/30 shadow-soft-lg">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="relative">
                <Hexagon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                <Sparkles className="w-4 h-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground">
                  IntentSearch
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  AI Discovery
                </span>
              </div>
            </motion.div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              {['How it Works', 'Features', 'About'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </nav>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/search')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-medium shadow-glow-sm hover:shadow-glow transition-shadow duration-300"
            >
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground/50 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                </span>
                Launch App
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
