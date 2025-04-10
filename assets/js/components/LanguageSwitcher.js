// 语言切换组件
import { SUPPORTED_LANGUAGES, getCurrentLanguage, setCurrentLanguage, updatePageTranslations } from '../utils/i18n.js';

export class LanguageSwitcher extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        const currentLanguage = getCurrentLanguage();
        
        this.shadowRoot.innerHTML = `
            <style>
                .language-switcher {
                    position: relative;
                    display: inline-block;
                }

                .language-button {
                    background: none;
                    border: none;
                    padding: 0.5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: inherit;
                    font-size: inherit;
                }

                .language-button:hover {
                    opacity: 0.8;
                }

                .language-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    display: none;
                    z-index: 50;
                }

                .language-dropdown.show {
                    display: block;
                }

                .language-option {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    white-space: nowrap;
                }

                .language-option:hover {
                    background: #f3f4f6;
                }

                .language-option.active {
                    background: #e5e7eb;
                }

                .flag-icon {
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 50%;
                    object-fit: cover;
                }
            </style>

            <div class="language-switcher">
                <button class="language-button">
                    <img 
                        class="flag-icon" 
                        src="/assets/images/flags/${currentLanguage}.svg" 
                        alt="${currentLanguage}"
                    >
                    <span>${SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)?.name || currentLanguage}</span>
                </button>
                <div class="language-dropdown">
                    ${SUPPORTED_LANGUAGES.map(lang => `
                        <div class="language-option ${lang.code === currentLanguage ? 'active' : ''}" data-language="${lang.code}">
                            <img 
                                class="flag-icon" 
                                src="/assets/images/flags/${lang.code}.svg" 
                                alt="${lang.code}"
                            >
                            <span>${lang.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    addEventListeners() {
        const button = this.shadowRoot.querySelector('.language-button');
        const dropdown = this.shadowRoot.querySelector('.language-dropdown');
        const options = this.shadowRoot.querySelectorAll('.language-option');

        // 切换下拉菜单显示/隐藏
        button.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });

        // 点击选项切换语言
        options.forEach(option => {
            option.addEventListener('click', () => {
                const languageCode = option.dataset.language;
                if (setCurrentLanguage(languageCode)) {
                    updatePageTranslations();
                    this.render();
                }
            });
        });

        // 点击外部关闭下拉菜单
        document.addEventListener('click', (event) => {
            if (!this.shadowRoot.contains(event.target)) {
                dropdown.classList.remove('show');
            }
        });
    }
}

// 注册自定义元素
customElements.define('language-switcher', LanguageSwitcher); 