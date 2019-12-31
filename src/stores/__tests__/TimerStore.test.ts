import TimerStore from '../TimerStore';

describe('TimerStore', () => {
  it('has correct default values and setters work', () => {
    const timer = new TimerStore();
    expect(timer.timeLeft).toBe(25 * 60 * 1000);
    timer.setMsLeft(0);
    expect(timer.timeLeft).toBe(0);
  });

  it('formats the time left correctly', () => {
    const timer = new TimerStore();
    timer.setMsLeft(25 * 60 * 1000);
    expect(timer.timeLeftFormatted).toBe('25:00');
    timer.setMsLeft(1.1 * 60 * 1000);
    expect(timer.timeLeftFormatted).toBe('1:06');
  });

  it('starts, pauses, resumes and resets the timer', () => {
    const initialValue = 25 * 60 * 1000;
    jest.useFakeTimers();
    const timer  = new TimerStore();
    expect(timer.timeLeft).toBe(initialValue);

    timer.startTimer();
    jest.advanceTimersByTime(2 * 60 * 1000);
    expect(timer.running).toBe(true);
    expect(timer.timeLeftFormatted).toBe('23:00')
    expect(timer.timeLeft).toBe(initialValue - 2 * 60 * 1000);

    timer.pauseTimer();
    jest.advanceTimersByTime(2 * 60);
    expect(timer.running).toBe(false);
    expect(timer.timeLeft).toBe(initialValue - 2 * 60 * 1000);

    timer.startTimer();
    jest.advanceTimersByTime(2 * 60 * 1000);
    expect(timer.running).toBe(true);
    expect(timer.timeLeft).toBe(initialValue - 4 * 60 * 1000);

    timer.resetTimer();
    jest.advanceTimersByTime(2 * 60 * 1000);
    expect(timer.running).toBe(false);
    expect(timer.timeLeft).toBe(initialValue);
  });
});