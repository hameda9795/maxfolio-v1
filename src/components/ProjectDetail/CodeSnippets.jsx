import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';

const CodeSnippet = ({ snippet, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [snippet, isExpanded]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <h5 className="text-white font-space font-semibold">
            {snippet.title}
          </h5>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-electric-blue/20 text-electric-blue">
            {snippet.language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <motion.button
            onClick={copyToClipboard}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-space text-sm transition-colors clickable flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </>
            )}
          </motion.button>

          {/* Expand/Collapse Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 rounded-lg bg-electric-blue/20 hover:bg-electric-blue/30 text-electric-blue font-space text-sm transition-colors clickable"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </motion.button>
        </div>
      </div>

      {/* Code Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isExpanded ? 'expanded' : 'collapsed'}
          initial={{ height: isExpanded ? 'auto' : 300, opacity: 0 }}
          animate={{ height: isExpanded ? 'auto' : 300, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden"
        >
          <div className={`${!isExpanded ? 'max-h-[300px]' : ''} overflow-auto custom-scrollbar`}>
            <pre className="!m-0 !p-6 !bg-transparent">
              <code className={`language-${snippet.language}`}>
                {snippet.code}
              </code>
            </pre>
          </div>

          {/* Fade Overlay when Collapsed */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-deep-purple to-transparent pointer-events-none" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const CodeSnippets = ({ snippets }) => {
  if (!snippets || snippets.length === 0) return null;

  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h3 className="text-3xl md:text-4xl font-orbitron font-bold gradient-text mb-4">
          Code Highlights
        </h3>
        <p className="text-gray-300 font-inter text-lg">
          Key technical implementations and interesting code snippets
        </p>
      </motion.div>

      <div className="space-y-6">
        {snippets.map((snippet, index) => (
          <CodeSnippet key={index} snippet={snippet} index={index} />
        ))}
      </div>

      {/* Custom Scrollbar Styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(15, 244, 198, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(15, 244, 198, 0.5);
        }

        /* Override Prism theme colors to match our design */
        pre[class*="language-"] {
          background: transparent !important;
          font-size: 14px;
          line-height: 1.6;
        }
        code[class*="language-"] {
          color: #e0e0e0;
        }
        .token.comment {
          color: #6a9fb5;
        }
        .token.string {
          color: #0FF4C6;
        }
        .token.keyword {
          color: #FF006E;
        }
        .token.function {
          color: #FFD700;
        }
        .token.number {
          color: #FF006E;
        }
      `}</style>
    </div>
  );
};

export default CodeSnippets;
