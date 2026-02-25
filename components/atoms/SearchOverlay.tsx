import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import media from 'constants/MediaQuery';
import { searchArtisteByQuery, searchSongByQuery } from 'utility/SearchApi/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState<string[]>([]);
  const [songs, setSongs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-focus input, scroll lock & reset on open/close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setArtists([]);
      setSongs([]);
      setHasSearched(false);
      setLoading(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!val.trim()) {
      setArtists([]);
      setSongs([]);
      setHasSearched(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      setHasSearched(true);
      try {
        const [artistRes, songRes] = await Promise.all([
          searchArtisteByQuery(val),
          searchSongByQuery(val),
        ]);

        // Try multiple common response shapes
        const extractList = (res: any): string[] => {
          const d = res?.data;
          if (Array.isArray(d)) return d;
          if (Array.isArray(d?.data)) return d.data;
          if (Array.isArray(d?.result)) return d.result;
          if (Array.isArray(d?.results)) return d.results;
          return [];
        };

        setArtists(extractList(artistRes));
        setSongs(extractList(songRes));
      } catch {
        setArtists([]);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const clearQuery = () => {
    setQuery('');
    setArtists([]);
    setSongs([]);
    setHasSearched(false);
    inputRef.current?.focus();
  };

  const hasResults = artists.length > 0 || songs.length > 0;
  const noResults = hasSearched && !loading && !hasResults && query.trim();

  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <Panel onClick={e => e.stopPropagation()}>

        {/* ── Search bar ── */}
        <SearchBar>
          <SearchIconWrap>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </SearchIconWrap>

          <Input
            ref={inputRef}
            value={query}
            onChange={handleChange}
            placeholder="Search artists, songs..."
            autoComplete="off"
            spellCheck={false}
          />

          {query && (
            <ClearBtn onClick={clearQuery} aria-label="Clear search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </ClearBtn>
          )}

          <CancelBtn onClick={onClose}>Cancel</CancelBtn>
        </SearchBar>

        {/* ── Results ── */}
        <Results>
          {!query && (
            <Hint>Start typing to search artists and songs across the charts…</Hint>
          )}

          {loading && (
            <LoadingState>
              <Spinner />
              <span>Searching…</span>
            </LoadingState>
          )}

          {noResults && (
            <EmptyState>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p>No results for <strong>"{query}"</strong></p>
              <span>Try a different search term</span>
            </EmptyState>
          )}

          {!loading && artists.length > 0 && (
            <Section>
              <SectionLabel>ARTISTS</SectionLabel>
              {artists.map((artist, i) => (
                <ResultItem key={i}>
                  <ResultIconWrap>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </ResultIconWrap>
                  <ResultText>{artist}</ResultText>
                </ResultItem>
              ))}
            </Section>
          )}

          {!loading && songs.length > 0 && (
            <Section>
              <SectionLabel>SONGS</SectionLabel>
              {songs.map((song, i) => (
                <ResultItem key={i}>
                  <ResultIconWrap>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>
                  </ResultIconWrap>
                  <ResultText>{song}</ResultText>
                </ResultItem>
              ))}
            </Section>
          )}
        </Results>
      </Panel>
    </Backdrop>
  );
};

export default SearchOverlay;

/* ── Animations ── */
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-24px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const spin = keyframes`to { transform: rotate(360deg); }`;

/* ── Styled components ── */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.18s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Panel = styled.div`
  width: 100%;
  max-width: 720px;
  background: #111;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 80px 32px 32px; /* top padding clears fixed navbar */
  animation: ${slideDown} 0.22s ease;
  max-height: 90vh;
  display: flex;
  flex-direction: column;

  ${media.tablet`
    max-width: 100%;
    border-radius: 0;
    padding: 72px 20px 24px;
  `}
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1e1e1e;
  border-radius: 12px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 28px;
  flex-shrink: 0;
`;

const SearchIconWrap = styled.div`
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 1.05rem;
  font-family: 'Work Sans', sans-serif;
  font-weight: 400;
  padding: 14px 0;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const ClearBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 50%;
  transition: color 0.2s;
  flex-shrink: 0;

  &:hover { color: white; }
`;

const CancelBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Work Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 4px 0 4px 8px;
  white-space: nowrap;
  flex-shrink: 0;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  transition: color 0.2s;

  &:hover { color: white; }
`;

const Results = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const Hint = styled.p`
  color: rgba(255, 255, 255, 0.3);
  font-family: 'Work Sans', sans-serif;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 40px;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 48px 0;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Work Sans', sans-serif;
  font-size: 0.9rem;
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(241, 146, 12, 0.25);
  border-top-color: #F1920C;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 0;
  color: rgba(255, 255, 255, 0.3);
  font-family: 'Work Sans', sans-serif;
  text-align: center;

  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    strong { color: white; }
  }

  span {
    font-size: 0.85rem;
  }
`;

const Section = styled.div`
  margin-bottom: 28px;
`;

const SectionLabel = styled.p`
  font-family: 'Work Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: #F1920C;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  border-radius: 8px;
  cursor: default;
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ResultIconWrap = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
`;

const ResultText = styled.span`
  font-family: 'Work Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
`;
