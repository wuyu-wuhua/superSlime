// 导入翻译配置
import translations from './translations.js';

// 创建 i18n 类
class I18n {
    constructor() {
        // 默认语言为英文
        this.currentLang = 'en';
        // 支持的语言列表
        this.supportedLangs = ['en', 'zh', 'ja', 'ko', 'es'];
        // 从本地存储中获取上次使用的语言
        this.loadLanguage();
    }

    // 加载语言设置
    loadLanguage() {
        const savedLang = localStorage.getItem('language');
        if (savedLang && this.supportedLangs.includes(savedLang)) {
            this.currentLang = savedLang;
        } else {
            // 如果没有保存的语言设置，尝试使用浏览器语言
            const browserLang = navigator.language.split('-')[0];
            if (this.supportedLangs.includes(browserLang)) {
                this.currentLang = browserLang;
            }
        }
    }

    // 保存语言设置
    saveLanguage(lang) {
        localStorage.setItem('language', lang);
    }

    // 切换语言
    changeLanguage(lang) {
        if (this.supportedLangs.includes(lang)) {
            this.currentLang = lang;
            this.saveLanguage(lang);
            this.updatePageContent();
        }
    }

    // 获取翻译文本
    t(key) {
        const keys = key.split('.');
        let value = translations[this.currentLang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                // 如果找不到翻译，返回英文版本
                value = this.getFallbackTranslation(key);
                break;
            }
        }
        
        return value || key;
    }

    // 获取英文版本的翻译作为后备
    getFallbackTranslation(key) {
        const keys = key.split('.');
        let value = translations['en'];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key;
            }
        }
        
        return value;
    }

    // 更新页面内容
    updatePageContent() {
        // 更新所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            // 根据元素类型更新内容
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // 更新所有带有 data-i18n-title 属性的元素
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });

        // 更新所有带有 data-i18n-alt 属性的元素
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            element.alt = this.t(key);
        });

        // 更新 HTML lang 属性
        document.documentElement.lang = this.currentLang;
    }
}

// 创建并导出 i18n 实例
const i18n = new I18n();
export default i18n; 