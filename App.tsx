
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { SCENARIOS, SYMPTOMS_BY_SCENARIO, US_STATES } from './constants';
import { AppState, VictimType, Gender, AidInstruction } from './types';
import { getFirstAidInstructions } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<AidInstruction | null>(null);
  
  const [appState, setAppState] = useState<AppState>({
    scenario: null,
    stateName: 'California',
    victimType: VictimType.ADULT,
    gender: Gender.MALE,
    symptoms: []
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const fetchInstructions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFirstAidInstructions(appState);
      setInstructions(data);
      handleNext();
    } catch (err) {
      setError('Could not generate instructions. Please try again or follow basic first aid principles.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSymptom = (id: string) => {
    setAppState(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(id) 
        ? prev.symptoms.filter(s => s !== id) 
        : [...prev.symptoms, id]
    }));
  };

  return (
    <Layout>
      {/* Step 0: Scenario Selection */}
      {step === 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold border-b pb-2">Select Scenario</h2>
          <div className="grid grid-cols-1 gap-3">
            {SCENARIOS.map(s => (
              <button
                key={s.id}
                onClick={() => { setAppState(prev => ({ ...prev, scenario: s.id })); handleNext(); }}
                className="flex items-center gap-4 p-4 border rounded-xl hover:bg-slate-50 transition-all text-left group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{s.icon}</span>
                <div>
                  <div className="font-bold text-lg">{s.title}</div>
                  <div className="text-sm text-slate-500">{s.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: State & Victim Details */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-xl font-bold">Victim Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Current State (Good Samaritan Law)</label>
              <select 
                value={appState.stateName}
                onChange={(e) => setAppState(prev => ({ ...prev, stateName: e.target.value }))}
                className="w-full p-3 border rounded-lg bg-white"
              >
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Victim Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setAppState(prev => ({ ...prev, victimType: VictimType.ADULT }))}
                  className={`p-3 border rounded-lg ${appState.victimType === VictimType.ADULT ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}
                >
                  Adult
                </button>
                <button 
                  onClick={() => setAppState(prev => ({ ...prev, victimType: VictimType.CHILD }))}
                  className={`p-3 border rounded-lg ${appState.victimType === VictimType.CHILD ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}
                >
                  Child
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Gender</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setAppState(prev => ({ ...prev, gender: Gender.MALE }))}
                  className={`p-3 border rounded-lg ${appState.gender === Gender.MALE ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}
                >
                  Male
                </button>
                <button 
                  onClick={() => setAppState(prev => ({ ...prev, gender: Gender.FEMALE }))}
                  className={`p-3 border rounded-lg ${appState.gender === Gender.FEMALE ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}
                >
                  Female
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button onClick={handleBack} className="flex-1 p-3 border rounded-lg font-medium">Back</button>
            <button onClick={handleNext} className="flex-1 p-3 bg-slate-900 text-white rounded-lg font-medium">Next</button>
          </div>
        </div>
      )}

      {/* Step 2: Symptom Selection */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-xl font-bold">Select Symptoms</h2>
          <p className="text-sm text-slate-500">Check everything that currently applies</p>
          
          <div className="space-y-2">
            {SYMPTOMS_BY_SCENARIO[appState.scenario || 'accident'].map(sym => (
              <button
                key={sym.id}
                onClick={() => toggleSymptom(sym.id)}
                className={`w-full p-4 border rounded-xl flex items-center justify-between transition-colors ${
                  appState.symptoms.includes(sym.id) ? 'border-blue-500 bg-blue-50' : 'bg-white hover:bg-slate-50'
                }`}
              >
                <span className="font-medium text-left">{sym.label}</span>
                {appState.symptoms.includes(sym.id) && (
                  <span className="text-blue-600 text-xl">✅</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-2 pt-4">
            <button onClick={handleBack} className="flex-1 p-3 border rounded-lg">Back</button>
            <button 
              onClick={fetchInstructions} 
              disabled={loading}
              className="flex-2 p-3 bg-red-600 text-white rounded-lg font-bold disabled:opacity-50 transition-opacity"
            >
              {loading ? 'Generating...' : 'GET EMERGENCY GUIDANCE'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2 text-center font-medium">{error}</p>}
        </div>
      )}

      {/* Step 3: Instructions Display */}
      {step === 3 && instructions && (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded shadow-sm">
            <h3 className="text-amber-800 font-bold mb-1">Legal Context ({appState.stateName})</h3>
            <p className="text-sm text-amber-700 leading-relaxed">{instructions.legalNotes}</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <section className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm">
              <h3 className="text-green-800 font-bold mb-3 flex items-center gap-2">
                <span>✅</span> WHAT TO DO
              </h3>
              <ul className="space-y-2">
                {instructions.do.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-green-600 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-red-50 border border-red-200 p-4 rounded-xl shadow-sm">
              <h3 className="text-red-800 font-bold mb-3 flex items-center gap-2">
                <span>❌</span> WHAT NOT TO DO
              </h3>
              <ul className="space-y-2">
                {instructions.dont.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-red-600 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm">
              <h3 className="text-blue-800 font-bold mb-3 flex items-center gap-2">
                <span>🛠️</span> IMPROVISED TOOLS
              </h3>
              <div className="flex flex-wrap gap-2">
                {instructions.improvisedTools.map((item, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">Step-by-Step Plan</h3>
              <div className="space-y-4">
                {instructions.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="bg-white text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <button 
            onClick={() => setStep(0)}
            className="w-full p-4 bg-slate-200 hover:bg-slate-300 rounded-xl font-bold transition-colors mb-8 text-slate-700"
          >
            START OVER
          </button>
        </div>
      )}
    </Layout>
  );
};

export default App;
