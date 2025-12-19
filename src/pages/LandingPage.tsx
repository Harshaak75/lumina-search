import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Brain, Layers, Eye, Award, ArrowRight, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Intent Understanding',
    description: 'We analyze what you truly want to learn, going beyond simple keyword matching to understand your learning goals and context.',
    color: 'text-stage-intent',
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Multi-Stage AI Processing',
    description: 'Our AI pipeline processes your query through intent analysis, discovery, intelligent filtering, and smart ranking.',
    color: 'text-stage-discover',
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: 'Transparent AI',
    description: 'See exactly what our AI is doing at each step. No black boxes—we explain every decision in real-time.',
    color: 'text-stage-filter',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Quality Over Popularity',
    description: 'We prioritize educational value, content structure, and teaching quality—not just views and likes.',
    color: 'text-stage-score',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function LandingPage() {
  const navigate = useNavigate();

  const handleTryBeta = () => {
    navigate('/search');
  };

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Beta v1 — AI-Powered Discovery</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
            Search YouTube
            <br />
            <span className="text-gradient">the intelligent way</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We understand intent, not just keywords. Discover the best videos and playlists
            through AI that values quality over popularity.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={handleTryBeta}
              className="group"
            >
              Try Beta v1
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A transparent, multi-stage AI pipeline that prioritizes your learning outcomes
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border hover:shadow-soft-xl transition-all duration-500"
              >
                <div className={`${feature.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Why this is different
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            YouTube's algorithm optimizes for engagement and watch time. We optimize for your learning.
            Our AI evaluates content structure, teaching methodology, and educational depth—things that
            matter when you're trying to actually learn something.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 rounded-full bg-card border border-border text-sm">
              No clickbait optimization
            </div>
            <div className="px-4 py-2 rounded-full bg-card border border-border text-sm">
              Focus on teaching quality
            </div>
            <div className="px-4 py-2 rounded-full bg-card border border-border text-sm">
              Multi-language support
            </div>
            <div className="px-4 py-2 rounded-full bg-card border border-border text-sm">
              Transparent scoring
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to discover smarter?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Experience AI-powered YouTube search that understands what you actually want to learn.
          </p>
          <Button
            variant="hero"
            size="xl"
            onClick={handleTryBeta}
            className="group"
          >
            Try Beta v1
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Beta v1 — AI-Powered YouTube Discovery</p>
        </div>
      </footer>
    </div>
  );
}
