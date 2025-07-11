import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Play, Volume2, ExternalLink } from 'lucide-react';

// Configureerbare data - hier kun je eenvoudig nieuwe combinaties toevoegen
const cardData = {
  cards: [
    { 
      id: 1, 
      name: 'Caballera', 
      type: 'De Avonturier',
      image: '/Caballera.png',
      text: 'Ik draag hakken omdat ik anders verdwijn. Ik heb een sleutel in mijn zak waarvan ik niet meer weet welk slot hij opent. Soms denk ik dat de nacht vriendelijk is, maar alleen als je haar niets vraagt. Ik heb ooit gezworen nooit meer terug te komen hier. En kijk, toch sta ik weer op deze hoek. De straat ruikt naar oude regen. Mijn jas zit vol verhalen die ik niemand vertel. Ik lach als je vraagt waar ik heenga. Misschien zoek ik iets wat niet gevonden wil worden. Misschien gewoon een plek waar niemand kijkt. Ik ben wie ik ben, ik ben een avonturier.'
    },
    { 
      id: 2, 
      name: 'Jonas', 
      type: 'De Reiziger',
      image: '/Jonas.png',
      text: 'Ik vertrek altijd voor ik welkom ben. Ik zoek steden die ik niet kan uitspreken. Soms denk ik dat ergens anders beter is, al weet ik niet beter dan dit. Mijn tas zit vol dingen die niemand nodig heeft, behalve ik. Een steentje uit een rivier, een foto zonder gezicht, een treinkaartje dat ooit belangrijk leek. Ik slaap het liefst waar niemand mij kent. Elke zonsopgang lijkt op de vorige, maar toch blijf ik kijken. Ik ben wie ik ben, ik ben een reiziger.'
    },
    { 
      id: 3, 
      name: 'Maggie', 
      type: 'De Hoeder',
      image: '/Maggie.png',
      text: 'Ik zet twee kopjes koffie, al weet ik dat er maar één nodig is. Soms laat ik het raam op een kier, voor het geval je terugkomt. Je sjaal ligt nog steeds op de stoel, ik heb hem nooit willen opruimen. Ik luister naar oude liedjes en denk dat je misschien ergens meezingt. Soms denk ik dat herinneren gewoon een andere manier is om te blijven. Je noemt het verdriet. Ik noem het trouw. Ik ben wie ik ben, ik ben een hoeder.'
    },
    { 
      id: 4, 
      name: 'Oscar', 
      type: 'De Denker',
      image: '/Oscar.png',
      text: 'Ik blijf zitten als iedereen vertrekt. Ik luister naar gesprekken die niet voor mij bedoeld zijn. Soms schrijf ik woorden op die ik niet begrijp, gewoon om te voelen hoe ze klinken. Ik heb een lade vol notities waarvan ik denk dat ze ooit iets zullen betekenen. Mijn gedachten lopen vooruit op mijn stem. Ik weet altijd waar ik ben, ook als ik net doe van niet. Er is een kaart in mijn hoofd, elk detail netjes gemarkeerd. Jij noemt het bedachtzaam. Ik ben wie ik ben, ik ben een denker.'
    },
  ],
  combinations: {
    '1-4': {
      title: 'Caballera & Oscar',
      text: 'Je vindt jezelf op een kruispunt dat je niet herkent. Iets in je zegt dat je moet wachten, maar je voeten willen verder. Er ligt een sleutel in je hand. Misschien past hij nergens. Misschien opent hij precies wat je vergeten was.',
      image: '/A Reflection klein met logo.jpg',
      audio: 'https://pub-e728888cee044a188c77ca2979d46545.r2.dev/City%20morning_short.mp3',
      musicInfo: {
        title: 'City morning',
        artist: 'Caballera'
      }
    },
    '1-2': {
      title: 'Caballera & Jonas',
      text: 'Je loopt door een straat die niet meer kent. Iemand kijkt op, een seconde te lang. Je vraagt je af of je dit al eens hebt gedroomd. Morgen ben je hier niet meer, maar iets van jou blijft achter.',
      image: '/kleinOctojungle.png',
      audio: 'https://pub-e728888cee044a188c77ca2979d46545.r2.dev/Postclubbingshort.mp3',
      musicInfo: {
        title: 'Postclubbing',
        artist: 'Caballera'
      }
    },
    '1-3': {
      title: 'Caballera & Maggie',
      text: 'Je denkt dat je weg moet, maar je hand blijft hangen op de deurklink. Er ligt nog iets op tafel dat je niet kunt achterlaten. Misschien is vertrekken gewoon een ander woord voor wachten.',
      image: '/Troon logo.png',
      audio: 'https://pub-e728888cee044a188c77ca2979d46545.r2.dev/All%20I%20hear%20is%20You_01.mp3',
      musicInfo: {
        title: 'All I hear is You',
        artist: 'Caballera'
      }
    },
    '2-4': {
      title: 'Oscar & Jonas',
      text: 'Je hebt een kaart getekend van plekken waar je nooit bent geweest. De lijnen lopen door tot aan de rand van je gedachten. Misschien is verdwalen de enige manier om te weten waar je begint.',
      image: '/Mothership small logo.png',
      audio: 'https://pub-e728888cee044a188c77ca2979d46545.r2.dev/Forever%20searching%20for%20what\'s%20forever%20lost_short.mp3',
      musicInfo: {
        title: 'Forever searching for what\'s forever lost',
        artist: 'Caballera'
      }
    },
    '3-4': {
      title: 'Oscar & Maggie',
      text: 'Je bladert door oude notities en leest een zin die je niet meer herinnert te hebben geschreven. Het papier ruikt naar een seizoen dat voorbij is. Soms is blijven zoeken een manier om niet te vergeten.',
      image: '/Waiting for my man logo site.jpg',
      audio: 'https://pub-e728888cee044a188c77ca2979d46545.r2.dev/Forever%20Blue_short.mp3',
      musicInfo: {
        title: 'Forever Blue',
        artist: 'Caballera'
      }
    },
    '2-3': {
      title: 'Jonas & Maggie',
      text: 'Je hebt je tas gepakt, maar iets in je blik zegt dat je niet echt weggaat. Misschien zijn sommige vertrekpunten gewoon cirkels. Iemand zal altijd op je wachten, zelfs als je nooit terugkomt.',
      image: '/Troon logo.png',
      audio: 'https://pub-e728888cee044a188c77ca2979d46545.r2.dev/Hate%20his%20wayshort.mp3',
      musicInfo: {
        title: 'Hate his way',
        artist: 'Caballera'
      }
    }
  }
};

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showReveal, setShowReveal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundMusicStarted, setBackgroundMusicStarted] = useState(false);
  
  // Audio refs voor achtergrondmuziek
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const predictionAudioRef = useRef<HTMLAudioElement | null>(null);

  // Fade functie voor audio
  const fadeAudio = (audio: HTMLAudioElement, targetVolume: number, duration: number = 2000) => {
    const startVolume = audio.volume;
    const volumeChange = targetVolume - startVolume;
    const steps = 50;
    const stepTime = duration / steps;
    const stepVolume = volumeChange / steps;
    
    let currentStep = 0;
    const fadeInterval = setInterval(() => {
      currentStep++;
      audio.volume = Math.max(0, Math.min(1, startVolume + (stepVolume * currentStep)));
      
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        if (targetVolume === 0) {
          audio.pause();
        }
      }
    }, stepTime);
  };

  // Start achtergrondmuziek op beginscherm
  const startBackgroundMusic = () => {
    if (!backgroundMusicStarted && !backgroundAudioRef.current) {
      console.log('Starting background music...');
      backgroundAudioRef.current = new Audio('https://pub-e728888cee044a188c77ca2979d46545.r2.dev/Alchemyst.mp3');
      backgroundAudioRef.current.loop = true;
      backgroundAudioRef.current.volume = 0;
      
      backgroundAudioRef.current.play().then(() => {
        console.log('Background music started successfully');
        setBackgroundMusicStarted(true);
        // Fade in de achtergrondmuziek
        if (backgroundAudioRef.current) {
          fadeAudio(backgroundAudioRef.current, 0.6, 1500);
        }
      }).catch(error => {
        console.error('Error playing background music:', error);
      });
    }
  };

  // Cleanup audio bij unmount
  useEffect(() => {
    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current = null;
      }
      if (predictionAudioRef.current) {
        predictionAudioRef.current.pause();
        predictionAudioRef.current = null;
      }
    };
  }, []);

  const handleCardSelect = (cardId: number) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(id => id !== cardId));
    } else if (selectedCards.length < 2) {
      const newSelection = [...selectedCards, cardId];
      setSelectedCards(newSelection);
      
      if (newSelection.length === 2) {
        setTimeout(() => setShowReveal(true), 500);
      }
    }
  };

  const proceedToResult = () => {
    setShowResult(true);
  };

  const reset = () => {
    setSelectedCards([]);
    setShowReveal(false);
    setShowResult(false);
    setIsPlaying(false);
    setGameStarted(false);
    setBackgroundMusicStarted(false);
    
    // Stop alle audio
    if (predictionAudioRef.current) {
      predictionAudioRef.current.pause();
      predictionAudioRef.current = null;
    }
    
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current = null;
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const playPredictionAudio = (audioUrl: string) => {
    console.log('Starting prediction audio:', audioUrl);
    
    // Stop en fade out achtergrondmuziek
    if (backgroundAudioRef.current) {
      console.log('Fading out background music...');
      fadeAudio(backgroundAudioRef.current, 0, 2000);
      setTimeout(() => {
        if (backgroundAudioRef.current) {
          backgroundAudioRef.current.pause();
          backgroundAudioRef.current = null;
        }
      }, 2500);
    }
    
    // Start voorspellingsmuziek na korte delay
    setTimeout(() => {
      if (predictionAudioRef.current) {
        predictionAudioRef.current.pause();
        predictionAudioRef.current = null;
      }
      
      predictionAudioRef.current = new Audio(audioUrl);
      predictionAudioRef.current.volume = 0;
      setIsPlaying(true);
      
      predictionAudioRef.current.play().then(() => {
        console.log('Prediction audio started successfully');
        // Fade in voorspellingsmuziek
        if (predictionAudioRef.current) {
          fadeAudio(predictionAudioRef.current, 0.7, 1500);
        }
      }).catch(error => {
        console.error('Error playing prediction audio:', error);
        setIsPlaying(false);
      });
      
      predictionAudioRef.current.onended = () => setIsPlaying(false);
      predictionAudioRef.current.onerror = () => setIsPlaying(false);
    }, 1500);
  };

  const getCombinationKey = () => {
    if (selectedCards.length !== 2) return '';
    const sorted = [...selectedCards].sort();
    return `${sorted[0]}-${sorted[1]}`;
  };

  const getCurrentCombination = () => {
    const key = getCombinationKey();
    return cardData.combinations[key as keyof typeof cardData.combinations];
  };

  // Auto-play audio wanneer resultaat scherm wordt getoond
  useEffect(() => {
    if (showResult) {
      const combination = getCurrentCombination();
      if (combination?.audio) {
        // Kleine delay om ervoor te zorgen dat het scherm eerst geladen is
        setTimeout(() => {
          playPredictionAudio(combination.audio);
        }, 1000);
      }
    }
  }, [showResult]);

  // Beginscherm met nieuwe Caballera afbeelding
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-orange-950 to-red-900 text-white flex items-center justify-center p-6 animate-fadeIn relative overflow-hidden">
        {/* Decoratieve achtergrond elementen */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-yellow-400 rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-orange-400 rotate-45"></div>
          <div className="absolute bottom-20 left-20 w-16 h-16 border border-yellow-300 rotate-12"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-orange-300 rounded-full"></div>
        </div>
        
        <div className="text-center space-y-8 max-w-6xl animate-scaleIn relative z-10">
          <img
            src="/Caballeraseeer.png"
            alt="Caballera"
            className="w-[700px] h-auto mx-auto rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-amber-500/20 hover:scale-105 border-2 border-amber-400/30"
            onLoad={() => console.log('Caballera image loaded successfully')}
            onError={(e) => {
              console.error('Caballera image failed to load');
              const target = e.currentTarget as HTMLImageElement;
              target.style.backgroundColor = '#1e1b4b';
              target.style.minHeight = '500px';
              target.style.display = 'flex';
              target.style.alignItems = 'center';
              target.style.justifyContent = 'center';
              target.alt = 'Caballera afbeelding niet beschikbaar';
            }}
          />
          <div className="space-y-6 animate-slideInLeft">
            <h1 className="text-6xl font-bold text-white mb-2" style={{ fontFamily: 'serif' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400">Welkom bij Caballera's Kaarten</span>
            </h1>
            <p className="text-2xl text-yellow-300 leading-relaxed mb-4 italic" style={{ fontFamily: 'serif' }}>
              de toekomst ligt in het donker
            </p>
            <p className="text-xl text-gray-300 leading-relaxed mb-6" style={{ fontFamily: 'serif' }}>
              Ontdek wat het universum voor je in petto heeft.
            </p>
            <p className="text-lg text-yellow-300 italic leading-relaxed" style={{ fontFamily: 'serif' }}>
              Probeer nergens aan te denken wanneer je je kaarten kiest.
            </p>
          </div>
          <button
            onClick={() => {
              startBackgroundMusic();
              setTimeout(() => startGame(), 500);
            }}
            className="group px-8 py-4 bg-gradient-to-r from-purple-800 via-purple-700 to-amber-700 hover:from-purple-900 hover:to-amber-800 rounded-xl text-xl font-semibold transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-amber-500/30 animate-pulse-slow border border-amber-400/50"
            className="group px-8 py-4 bg-gradient-to-r from-red-800 via-orange-700 to-yellow-700 hover:from-red-900 hover:to-yellow-800 rounded-xl text-xl font-semibold transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-orange-500/30 animate-pulse-slow border border-yellow-400/50"
            style={{ fontFamily: 'serif' }}
          >
            <span className="flex items-center gap-3">
              <Play size={24} />
              Begin je Lezing
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Onthulling scherm - toont de gekozen kaarten met hun teksten
  if (showReveal && !showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-orange-950 to-red-900 text-white p-6 animate-fadeIn relative overflow-hidden">
        {/* Decoratieve achtergrond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.1) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <button
            onClick={reset}
            className="mb-8 flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition-all duration-300 hover:scale-105 border border-amber-400/30 backdrop-blur-sm"
            style={{ fontFamily: 'serif' }}
          >
            <RotateCcw size={20} />
            Nieuwe Lezing
          </button>

          <div className="text-center mb-12 animate-slideInLeft">
            <h1 className="text-5xl font-bold mb-4 text-yellow-400" style={{ fontFamily: 'serif' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">Je Gekozen Kaarten</span>
            </h1>
            <p className="text-xl text-gray-400" style={{ fontFamily: 'serif' }}>
              Het universum heeft gesproken...
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {selectedCards.map((cardId) => {
              const card = cardData.cards.find(c => c.id === cardId);
              return (
                <div key={cardId} className="bg-red-900/60 backdrop-blur-sm rounded-2xl p-8 space-y-6 animate-scaleIn transition-all duration-500 hover:bg-red-800/60 hover:shadow-2xl hover:shadow-orange-500/20 border border-yellow-400/20">
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      <div className="relative w-80 h-[500px] flex items-center justify-center transition-transform duration-300 hover:scale-105">
                        <img
                          src={card?.image}
                          alt={card?.name}
                          className="max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-all duration-300 hover:shadow-orange-500/30 border border-yellow-400/30"
                          onLoad={() => console.log(`Card image loaded: ${card?.image}`)}
                          onError={(e) => {
                            console.error('Card image failed to load:', card?.image);
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.backgroundColor = '#1e1b4b';
                            target.style.minHeight = '400px';
                            target.style.width = '250px';
                            target.style.display = 'flex';
                            target.style.alignItems = 'center';
                            target.style.justifyContent = 'center';
                            target.style.color = '#9CA3AF';
                          }}
                        />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-yellow-300 mb-2" style={{ fontFamily: 'serif' }}>
                      {card?.name}
                    </h3>
                    <p className="text-lg text-orange-200 italic mb-4" style={{ fontFamily: 'serif' }}>
                      {card?.type}
                    </p>
                  </div>
                  
                  <div className="bg-red-800/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-red-700/50 border border-orange-400/20">
                    <p 
                      className="text-gray-200 leading-relaxed text-lg italic"
                      style={{ 
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        lineHeight: '1.8'
                      }}
                    >
                      {card?.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={proceedToResult}
              className="px-8 py-4 bg-gradient-to-r from-orange-700 via-red-600 to-yellow-700 hover:from-orange-800 hover:to-yellow-800 rounded-xl text-xl font-semibold transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-orange-500/40 animate-pulse-slow border border-yellow-400/50"
              style={{ fontFamily: 'serif' }}
            >
              Ontdek je Voorspelling
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Resultaat scherm
  if (showResult) {
    const combination = getCurrentCombination();
    if (!combination) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-orange-950 to-red-900 text-white p-6 animate-fadeIn relative overflow-hidden">
        {/* Decoratieve achtergrond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.15) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, rgba(251, 146, 60, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(139, 69, 19, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <button
            onClick={reset}
            className="mb-8 flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition-all duration-300 hover:scale-105 border border-amber-400/30 backdrop-blur-sm"
            style={{ fontFamily: 'serif' }}
          >
            <RotateCcw size={20} />
            Nieuwe Lezing
          </button>

          <div className="text-center space-y-8 animate-scaleIn">
            <h1 className="text-4xl font-bold text-yellow-400 mb-2" style={{ fontFamily: 'serif' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">{combination.title}</span>
            </h1>
            
            <div className="flex justify-center gap-8 mb-8 animate-slideInLeft">
              {selectedCards.map(cardId => {
                const card = cardData.cards.find(c => c.id === cardId);
                return (
                  <div key={cardId} className="text-center transition-transform duration-300 hover:scale-105">
                    <div className="relative w-40 h-64 flex items-center justify-center mb-4 transition-all duration-300 hover:shadow-2xl">
                      <img
                        src={card?.image}
                        alt={card?.name}
                        className="max-w-full max-h-full object-contain rounded-xl shadow-lg transition-all duration-300 hover:shadow-orange-500/30 border border-yellow-400/30"
                        onLoad={() => console.log(`Result card image loaded: ${card?.image}`)}
                        onError={(e) => {
                          console.error('Result card image failed to load:', card?.image);
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.backgroundColor = '#1e1b4b';
                          target.style.minHeight = '240px';
                          target.style.width = '150px';
                          target.style.display = 'flex';
                          target.style.alignItems = 'center';
                          target.style.justifyContent = 'center';
                          target.style.color = '#9CA3AF';
                        }}
                      />
                    </div>
                    <p className="text-yellow-300 font-semibold text-lg" style={{ fontFamily: 'serif' }}>{card?.name}</p>
                    <p className="text-orange-200 italic" style={{ fontFamily: 'serif' }}>{card?.type}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-red-900/60 backdrop-blur-sm rounded-2xl p-8 space-y-6 animate-slideInRight transition-all duration-500 hover:bg-red-800/60 hover:shadow-2xl hover:shadow-orange-500/20 border border-yellow-400/20">
              <h2 className="text-2xl font-bold text-yellow-300 mb-4" style={{ fontFamily: 'serif' }}>
                Voorspelling
              </h2>
              
              <img
                src={combination.image}
                alt={combination.title}
                className="w-full max-w-lg h-auto mx-auto rounded-xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-orange-500/30 border border-yellow-400/30"
                onLoad={() => console.log(`Combination image loaded: ${combination.image}`)}
                onError={(e) => {
                  console.error('Combination image failed to load:', combination.image);
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.backgroundColor = '#1e1b4b';
                  target.style.minHeight = '300px';
                  target.style.display = 'flex';
                  target.style.alignItems = 'center';
                  target.style.justifyContent = 'center';
                  target.style.color = '#9CA3AF';
                }}
              />
              
              <p 
                className="text-lg leading-relaxed text-gray-300 max-w-2xl mx-auto italic"
                style={{ 
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  lineHeight: '1.8'
                }}
              >
                {combination.text}
              </p>
              
              {/* Muziek informatie blok */}
              <div className="bg-red-800/50 backdrop-blur-sm rounded-xl p-6 space-y-4 max-w-md mx-auto transition-all duration-300 hover:bg-red-700/50 hover:shadow-xl hover:shadow-orange-500/20 border border-orange-400/30">
                <div className="flex items-center justify-center gap-2 text-yellow-400 mb-3">
                  <Volume2 size={20} />
                  <span className="text-lg font-semibold" style={{ fontFamily: 'serif' }}>
                    Nu Speelt
                  </span>
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-xl font-bold text-white" style={{ fontFamily: 'serif' }}>
                    {combination.musicInfo.title}
                  </p>
                  <p className="text-lg text-orange-300" style={{ fontFamily: 'serif' }}>
                    door {combination.musicInfo.artist}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-red-700">
                  <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: 'serif' }}>
                    Van het album City Nights
                  </p>
                  <a 
                    href="https://distrokid.com/hyperfollow/caballera/city-nights"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-700 hover:bg-orange-800 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-orange-500/30 text-sm font-semibold border border-yellow-400/50"
                    style={{ fontFamily: 'serif' }}
                  >
                    <ExternalLink size={16} />
                    Beluister het volledige album
                  </a>
                </div>
                
                <div className="text-center">
                  <span className="text-sm text-gray-500" style={{ fontFamily: 'serif' }}>
                    {isPlaying ? 'Muziek speelt...' : 'Muziek wordt geladen...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Kaart selectie scherm - toont alleen achterkanten
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-orange-950 to-red-900 text-white p-6 animate-fadeIn relative overflow-hidden">
      {/* Decoratieve achtergrond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(239, 68, 68, 0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 70% 30%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center">
        <button
          onClick={reset}
          className="mb-8 flex items-center gap-2 px-4 py-2 bg-red-900/80 hover:bg-red-800/80 rounded-lg transition-all duration-300 hover:scale-105 border border-yellow-400/30 backdrop-blur-sm"
          style={{ fontFamily: 'serif' }}
        >
          <RotateCcw size={20} />
          Terug naar begin
        </button>

        <h1 className="text-5xl font-bold mb-4 text-yellow-400 animate-slideInLeft" style={{ fontFamily: 'serif' }}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">Kies je Kaarten</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 animate-slideInRight" style={{ fontFamily: 'serif' }}>
          Laat je intuïtie je leiden en selecteer 2 kaarten
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 animate-scaleIn">
          {cardData.cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardSelect(card.id)}
              className={`
                relative cursor-pointer transform transition-all duration-500 
                ${selectedCards.includes(card.id) 
                  ? 'scale-110 ring-4 ring-yellow-400 shadow-2xl shadow-orange-500/30' 
                  : 'hover:scale-105 hover:ring-2 hover:ring-yellow-300 hover:shadow-xl hover:shadow-orange-500/20'
                }
                rounded-xl overflow-hidden shadow-lg
              `}
            >
              <img
                src="/Tarot_back.png"
                alt="Tarot kaart achterkant"
                className="w-full h-auto object-contain transition-all duration-300"
                style={{ aspectRatio: '9/16' }}
                onLoad={() => console.log('Tarot back image loaded')}
                onError={(e) => {
                  console.error('Tarot back image failed to load');
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.backgroundColor = '#1e1b4b';
                  target.style.minHeight = '200px';
                  target.style.display = 'flex';
                  target.style.alignItems = 'center';
                  target.style.justifyContent = 'center';
                  target.alt = 'Kaart achterkant niet beschikbaar';
                }}
              />
              
              {selectedCards.includes(card.id) && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-red-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg shadow-yellow-500/50 animate-pulse-slow border border-yellow-300">
                  {selectedCards.indexOf(card.id) + 1}
                </div>
               )}
            </div>
          ))}
        </div>

        <div className="text-gray-400 mb-8 animate-fadeIn" style={{ fontFamily: 'serif' }}>
          {selectedCards.length === 0 && "Vertrouw op je intuïtie en kies je eerste kaart"}
          {selectedCards.length === 1 && "Kies je tweede kaart om je lezing te voltooien"}
          {selectedCards.length === 2 && "Je kaarten worden onthuld..."}
        </div>

        <div className="flex justify-center gap-2 animate-fadeIn">
          {[0, 1].map(i => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-500 border border-yellow-400/30 ${
                selectedCards.length > i ? 'bg-yellow-500' : 'bg-red-800'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;