import { escapeHtml } from '@/utils/sanitize';
import { formatPrice, formatChange, getChangeClass } from '@/utils';
import { t } from '@/services/i18n';

export interface IndexConstituent {
  symbol: string;
  name: string;
  price: number;
  change: number;
  weight?: number; // percentage weight in index
}

export interface SectorData {
  name: string;
  change: number;
  weight?: number;
}

export class IndexDetailsModal {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'index-modal-overlay';
    document.body.appendChild(this.element);
    this.setupEventListeners();

    // Remove will-change after entrance animation to free GPU memory
    const modal = this.element.querySelector('.index-modal') as HTMLElement | null;
    modal?.addEventListener('animationend', () => {
      modal.style.willChange = 'auto';
    }, { once: true });
  }

  private setupEventListeners(): void {
    this.element.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('index-modal-overlay')) {
        this.hide();
      }
    });

    this.element.querySelector('.index-modal-close')?.addEventListener('click', () => {
      this.hide();
    });
  }

  public show(
    indexSymbol: string,
    indexName: string,
    constituents: IndexConstituent[],
    sectors: SectorData[],
    price: number | null = null,
    change: number | null = null,
  ): void {
    const constituentsHtml = constituents
      .slice(0, 10)
      .map(
        (c) => `
      <div class="constituent-item">
        <div class="constituent-info">
          <span class="constituent-symbol">${escapeHtml(c.symbol)}</span>
          <span class="constituent-name">${escapeHtml(c.name)}</span>
          ${c.weight ? `<span class="constituent-weight">${c.weight.toFixed(1)}%</span>` : ''}
        </div>
        <div class="constituent-data">
          <span class="constituent-price">${formatPrice(c.price)}</span>
          <span class="constituent-change ${getChangeClass(c.change)}">${formatChange(c.change)}</span>
        </div>
      </div>
    `
      )
      .join('');

    const sectorsHtml = sectors
      .map(
        (s) => `
      <div class="sector-row">
        <span class="sector-name">${escapeHtml(s.name)}</span>
        ${s.weight ? `<span class="sector-weight">${s.weight.toFixed(1)}%</span>` : ''}
        <span class="sector-change ${getChangeClass(s.change)}">${formatChange(s.change)}</span>
      </div>
    `
      )
      .join('');

    const headerContent = `
      <div class="index-modal-header">
        <div class="index-modal-title-section">
          <h2 class="index-modal-title">${escapeHtml(indexName)}</h2>
          <span class="index-modal-symbol">${escapeHtml(indexSymbol)}</span>
        </div>
        ${price !== null ? `
          <div class="index-modal-price-section">
            <span class="index-modal-price">${formatPrice(price)}</span>
            ${change !== null ? `<span class="index-modal-change ${getChangeClass(change)}">${formatChange(change)}</span>` : ''}
          </div>
        ` : ''}
        <button class="index-modal-close">×</button>
      </div>
    `;

    this.element.innerHTML = `
      <div class="index-modal">
        ${headerContent}
        <div class="index-modal-content">
          <div class="index-modal-section">
            <h3>${t('modals.indexDetails.topConstituents')}</h3>
            <div class="constituents-list">
              ${constituentsHtml || '<p class="no-data">' + t('common.noData') + '</p>'}
            </div>
          </div>

          <div class="index-modal-section">
            <h3>${t('modals.indexDetails.sectorBreakdown')}</h3>
            <div class="sectors-list">
              ${sectorsHtml || '<p class="no-data">' + t('common.noData') + '</p>'}
            </div>
          </div>
        </div>
      </div>
    `;

    this.element.classList.add('visible');
    this.setupEventListeners();
  }

  public hide(): void {
    this.element.classList.remove('visible');
  }

  public isVisible(): boolean {
    return this.element.classList.contains('visible');
  }

  public destroy(): void {
    this.element.remove();
  }
}
