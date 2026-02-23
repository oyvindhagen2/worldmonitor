import { Panel } from './Panel';
import { t } from '@/services/i18n';
import type { MarketData } from '@/types';
import { formatPrice, formatChange, getChangeClass } from '@/utils';
import { escapeHtml } from '@/utils/sanitize';

// Type for grouped indices data
interface RegionalIndices {
  region: string;
  timezone: string;
  indices: MarketData[];
  isOpen: boolean;
}

function miniSparkline(data: number[] | undefined, change: number | null, w = 50, h = 16): string {
  if (!data || data.length < 2) return '';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const color = change != null && change >= 0 ? 'var(--green)' : 'var(--red)';
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 2) - 1;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" class="mini-sparkline"><polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function isMarketOpen(timezone: string): boolean {
  if (!timezone) return false;

  const now = new Date();
  const timeInTz = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  const hours = timeInTz.getHours();
  const minutes = timeInTz.getMinutes();
  const dayOfWeek = timeInTz.getDay();

  // Skip weekends
  if (dayOfWeek === 0 || dayOfWeek === 6) return false;

  // Define trading hours for different regions
  // This is simplified; actual hours vary by exchange
  const hoursMins = hours + minutes / 60;

  // AM: 9:00-16:30 (generic major exchange hours)
  return hoursMins >= 9 && hoursMins < 16.5;
}

function groupIndicesByRegion(data: MarketData[]): RegionalIndices[] {
  const regions: Record<string, RegionalIndices> = {
    'Americas': { region: 'Americas', timezone: 'America/New_York', indices: [], isOpen: false },
    'Europe': { region: 'Europe', timezone: 'Europe/London', indices: [], isOpen: false },
    'Asia-Pacific': { region: 'Asia-Pacific', timezone: 'Asia/Tokyo', indices: [], isOpen: false },
  };

  // Map symbols to regions
  const regionMap: Record<string, string> = {
    '^GSPC': 'Americas', '^DJI': 'Americas', '^IXIC': 'Americas',
    '^FTSE': 'Europe', '^GDAXI': 'Europe', '^FCHI': 'Europe', '^STOXX50E': 'Europe',
    '^SSMI': 'Europe', '^AEX': 'Europe', '^OSLO': 'Europe',
    '^N225': 'Asia-Pacific', '^HSI': 'Asia-Pacific', '^SSEC': 'Asia-Pacific',
    '^KS11': 'Asia-Pacific', '^BSESN': 'Asia-Pacific', '^NSEI': 'Asia-Pacific',
    '^AXJO': 'Asia-Pacific', '^TWII': 'Asia-Pacific',
  };

  data.forEach(index => {
    const region = regionMap[index.symbol];
    if (region && regions[region]) {
      regions[region].indices.push(index);
    }
  });

  // Check if markets are open for each region
  Object.values(regions).forEach(r => {
    r.isOpen = isMarketOpen(r.timezone);
  });

  // Return only regions with data, sorted
  return Object.values(regions)
    .filter(r => r.indices.length > 0)
    .sort((a, b) => {
      const order = ['Americas', 'Europe', 'Asia-Pacific'];
      return order.indexOf(a.region) - order.indexOf(b.region);
    });
}

export class GlobalIndicesPanel extends Panel {
  private onIndexClick?: (symbol: string, name: string) => void;

  constructor() {
    super({ id: 'global-indices', title: t('panels.globalIndices') });
  }

  public setIndexClickHandler(handler: (symbol: string, name: string) => void): void {
    this.onIndexClick = handler;
  }

  public renderIndices(data: MarketData[]): void {
    if (data.length === 0) {
      this.showError(t('common.failedMarketData'));
      return;
    }

    const grouped = groupIndicesByRegion(data);

    if (grouped.length === 0) {
      this.showError(t('common.failedMarketData'));
      return;
    }

    const html = grouped
      .map(
        (region) => `
      <div class="indices-region">
        <div class="region-header">
          <span class="region-name">${escapeHtml(region.region)}</span>
          <span class="region-status ${region.isOpen ? 'open' : 'closed'}">
            ${region.isOpen ? '🔴 OPEN' : '⚫ CLOSED'}
          </span>
        </div>
        <div class="indices-grid">
          ${region.indices
            .map(
              (index) => `
            <div class="index-item" data-symbol="${escapeHtml(index.symbol)}" role="button" tabindex="0">
              <div class="index-header">
                <span class="index-name">${escapeHtml(index.name)}</span>
                <span class="index-symbol">${escapeHtml(index.display)}</span>
              </div>
              <div class="index-sparkline">
                ${miniSparkline(index.sparkline, index.change)}
              </div>
              <div class="index-data">
                <span class="index-price">${index.price !== null ? formatPrice(index.price) : '—'}</span>
                <span class="index-change ${index.change !== null ? getChangeClass(index.change) : ''}">${index.change !== null ? formatChange(index.change) : '—'}</span>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `
      )
      .join('');

    this.setContent(html);
    this.setupIndexClickHandlers();
  }

  private setupIndexClickHandlers(): void {
    const items = this.content.querySelectorAll('.index-item');
    items.forEach((item) => {
      const onClickHandler = () => {
        const symbol = item.getAttribute('data-symbol');
        const name = item.querySelector('.index-name')?.textContent;
        if (symbol && name && this.onIndexClick) {
          this.onIndexClick(symbol, name);
        }
      };
      item.addEventListener('click', onClickHandler);
      item.addEventListener('keydown', (e) => {
        const ke = e as KeyboardEvent;
        if (ke.key === 'Enter' || ke.key === ' ') {
          ke.preventDefault();
          onClickHandler();
        }
      });
    });
  }
}
