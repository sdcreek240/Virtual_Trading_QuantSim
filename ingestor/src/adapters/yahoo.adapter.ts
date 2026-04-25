export default class YahooAdapter {
  client: any = null;
  initialized = false;

  async init() {
    try {
      const mod = await import('yahoo-finance2');
      const candidate = mod?.default || mod;

      // v3: candidate may be an object with YahooFinance class
      if (candidate?.YahooFinance) {
        // suppress yahoo survey notices
        try {
          this.client = new candidate.YahooFinance({ suppressNotices: ['yahooSurvey'] });
        } catch (e) {
          // fallback to plain instantiation
          this.client = new candidate.YahooFinance();
        }
      }
      // v3 default export class
      else if (typeof candidate === 'function' && candidate.prototype && typeof candidate.prototype.quote === 'function') {
        try {
          this.client = new candidate({ suppressNotices: ['yahooSurvey'] });
        } catch (e) {
          this.client = new candidate();
        }
      }
      // v2 style: object with quote()
      else if (candidate && typeof candidate.quote === 'function') {
        this.client = candidate;
      }
      // fallback: function export acting as quote(symbol)
      else if (typeof candidate === 'function') {
        this.client = { quote: candidate };
      } else {
        throw new Error('Unsupported yahoo-finance2 module shape');
      }

      this.initialized = true;
      console.log('✅ YahooAdapter initialized (type=' + (this.client && this.client.quote ? 'quote-fn' : typeof this.client) + ')');
    } catch (e) {
      console.warn('⚠️ YahooAdapter init failed:', e instanceof Error ? e.message : e);
      this.client = null;
      this.initialized = false;
    }
  }

  async quote(symbol: string) {
    if (!this.initialized || !this.client) throw new Error('YahooAdapter not initialized');
    if (this.client && typeof this.client.quote === 'function') {
      return await this.client.quote(symbol);
    }
    throw new Error('Unsupported yahoo client shape at quote time');
  }
}
