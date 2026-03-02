import { useState } from 'react';
import { CHECK_QUESTIONS, evaluateCheck, getMoldWarning } from '../utils/decisions';
import type { CheckResult } from '../types';

const RESULT_LABELS: Record<CheckResult, string> = {
  groen: '✅ Uitstekend! Je kefir ziet er gezond uit.',
  oranje: '⚠️ Matig. Let extra op bij de volgende batch.',
  rood: '❌ Probleem gedetecteerd. Zie waarschuwing hieronder.',
};

const RESULT_COLORS: Record<CheckResult, string> = {
  groen: '#22c55e',
  oranje: '#f97316',
  rood: '#ef4444',
};

export function Check() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleAnswer(questionId: string, score: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  }

  function handleSubmit() {
    if (Object.keys(answers).length < CHECK_QUESTIONS.length) return;
    setSubmitted(true);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  const answerValues = CHECK_QUESTIONS.map((q) => answers[q.id] ?? '');
  const result: CheckResult | null = submitted ? evaluateCheck(answerValues) : null;
  const moldWarning = submitted ? getMoldWarning(answerValues) : null;
  const allAnswered = Object.keys(answers).length === CHECK_QUESTIONS.length;

  return (
    <div className="card">
      <h2>Kefir Gezondheidscheck</h2>
      <p>Beoordeel de kwaliteit van je huidige batch kefir.</p>

      {!submitted ? (
        <>
          {CHECK_QUESTIONS.map((q) => (
            <div key={q.id} className="check-question">
              <p>
                <strong>{q.text}</strong>
              </p>
              <div className="check-options">
                {(['green', 'orange', 'red'] as const).map((score) => (
                  <label key={score} className={`check-option check-option--${score}`}>
                    <input
                      type="radio"
                      name={q.id}
                      value={score}
                      checked={answers[q.id] === score}
                      onChange={() => handleAnswer(q.id, score)}
                    />
                    {q.scores[score]}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            Bekijk resultaat
          </button>
        </>
      ) : (
        <div className="check-result">
          {result && (
            <div
              className="result-box"
              style={{ borderColor: RESULT_COLORS[result] }}
            >
              <p style={{ color: RESULT_COLORS[result] }}>{RESULT_LABELS[result]}</p>
            </div>
          )}

          {moldWarning && (
            <div className="error-box">
              <strong>{moldWarning}</strong>
            </div>
          )}

          <button className="btn btn-secondary" onClick={handleReset}>
            Opnieuw beoordelen
          </button>
        </div>
      )}
    </div>
  );
}
