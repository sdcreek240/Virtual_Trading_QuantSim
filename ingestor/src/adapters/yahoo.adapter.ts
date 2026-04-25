export default class YahooAdapter {
  client: any = null;
  initialized = false;

  async init() {
    try {
      const mod = await import('yahoo-finance2');
      if (mod?.YahooFinance) {
        // v3 export: class
        this.client = new mod.YahooFinance();
      } else if (mod?.default?.YahooFinance) {
        this.client = new mod.default.YahooFinance();
      } else if (mod?.quote && typeof mod.quote === 'function') {
        // v2 style export object with quote()
        this.client = mod;
      } else if (typeof mod === 'function') {
        // default function export
        this.client = { quote: mod };
      } else {
        this.client = mod?.default || mod;
      }
      this.initialized = true;
      console.log('✅ YahooAdapter initialized');
    } catch (e) {
      console.warn('⚠️ YahooAdapter init failed:', e instanceof Error ? e.message : e);
      this.client = null;
      this.initialized = false;
    }
  }

  async quote(symbol: string) {
    if (!this.initialized || !this.client) throw new Error('YahooAdapter not initialized');
    // The client shape may be a function or an object with quote()
    if (typeof this.client === 'function') {
      return this.client(symbol);
    }
    if (this.client.quote) return this.client.quote(symbol);
    if (this.client.default && typeof this.client.default === 'function') return this.client.default(symbol);
    throw new Error('Unsupported yahoo client shape');
  }
}
