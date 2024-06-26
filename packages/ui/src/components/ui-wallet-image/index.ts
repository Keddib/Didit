import { html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { resetStyles } from '../../utils/ThemeUtil.js'
import type { BorderRadiusType, SizeType } from '../../utils/TypeUtil.js'
import { customElement } from '../../utils/WebComponentsUtil.js'
import '../../atoms/ui-icon/index.js'
import '../../atoms/ui-image/index.js'
import styles from './styles.js'

@customElement('ui-wallet-image')
export class UiWalletImage extends LitElement {
  public static override styles = [resetStyles, styles]

  // -- State & Properties -------------------------------- //
  @property() public size: Exclude<SizeType, 'xs' | 'xxs'> = 'md'

  @property() public name = ''

  @property() public imageSrc?: string

  @property() public walletIcon?: string = 'wallet'

  @property({ type: Boolean }) public withPadding = false

  // -- Render -------------------------------------------- //
  public override render() {
    let borderRadius: BorderRadiusType = '3xs'
    if (this.size === 'lg' || this.size === 'xl') {
      borderRadius = 'xs'
    } else if (this.size === 'md') {
      borderRadius = 'xxs'
    } else {
      borderRadius = '3xs'
    }
    const paddingValue = this.withPadding ? 'calc(48% / 2)' : '0'
    this.style.cssText = `
      --local-border-radius: var(--ui-border-radius-${borderRadius});
      --local-size: var(--ui-wallet-image-size-${this.size});
      --local-padding: ${paddingValue};
   `

    return html`
      <ui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </ui-flex>
    `
  }

  // -- Private ------------------------------------------- //
  private templateVisual() {
    let borderRadius = '5xs'
    if (this.size === 'lg' || this.size === 'xl') {
      borderRadius = '3xs'
    } else if (this.size === 'md') {
      borderRadius = '4xs'
    } else {
      borderRadius = '5xs'
    }
    if (this.imageSrc) {
      return html`<ui-image
        borderRadius=${borderRadius}
        class="wallet-image"
        src=${this.imageSrc}
        alt=${this.name}
      ></ui-image>`
    }

    return html`<ui-icon
      class="wallet-icon"
      size="inherit"
      color="inherit"
      name=${this.walletIcon ?? 'wallet'}
    ></ui-icon>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-wallet-image': UiWalletImage
  }
}
