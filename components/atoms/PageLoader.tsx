import { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import styled, { keyframes, css } from 'styled-components';

const PageLoader = () => {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);
    const completeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startProgress = () => {
        setLoading(true);
        setProgress(0);

        // Crawl to ~85% during loading, slowing as it gets higher
        let current = 0;
        timer.current = setInterval(() => {
            current += Math.random() * 12;
            if (current >= 85) {
                current = 85;
                if (timer.current) clearInterval(timer.current);
            }
            setProgress(current);
        }, 200);
    };

    const completeProgress = () => {
        if (timer.current) clearInterval(timer.current);
        setProgress(100);
        completeTimer.current = setTimeout(() => {
            setLoading(false);
            setProgress(0);
        }, 400);
    };

    useEffect(() => {
        Router.events.on('routeChangeStart', startProgress);
        Router.events.on('routeChangeComplete', completeProgress);
        Router.events.on('routeChangeError', completeProgress);

        return () => {
            Router.events.off('routeChangeStart', startProgress);
            Router.events.off('routeChangeComplete', completeProgress);
            Router.events.off('routeChangeError', completeProgress);
            if (timer.current) clearInterval(timer.current);
            if (completeTimer.current) clearTimeout(completeTimer.current);
        };
    }, []);

    if (!loading) return null;

    return <LoaderBar progress={progress} />;
};

export default PageLoader;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 6px 1px #F1920C88; }
  50%       { box-shadow: 0 0 14px 3px #F1920Ccc; }
`;

const LoaderBar = styled.div<{ progress: number }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 3px;
  background: linear-gradient(90deg, #F1920C, #FFD166);
  border-radius: 0 3px 3px 0;
  transition: width 0.2s ease;
  width: ${({ progress }) => progress}%;
  animation: ${glow} 1.2s ease-in-out infinite;

  /* Bright tip dot */
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #FFD166;
    box-shadow: 0 0 10px 2px #F1920C;
  }
`;
