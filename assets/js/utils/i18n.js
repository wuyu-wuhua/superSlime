// 导入翻译文件
import { translations } from '../i18n/translations.js';

// 默认语言
const DEFAULT_LANGUAGE = 'en';

// 支持的语言列表
export const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'es', name: 'Español' }
];

// 获取当前语言
export function getCurrentLanguage() {
    // 从 localStorage 获取保存的语言设置
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && SUPPORTED_LANGUAGES.some(lang => lang.code === savedLanguage)) {
        return savedLanguage;
    }
    
    // 如果没有保存的语言设置，尝试从浏览器语言获取
    const browserLanguage = navigator.language.split('-')[0];
    if (SUPPORTED_LANGUAGES.some(lang => lang.code === browserLanguage)) {
        return browserLanguage;
    }
    
    // 如果都不匹配，返回默认语言
    return DEFAULT_LANGUAGE;
}

// 设置当前语言
export function setCurrentLanguage(languageCode) {
    if (SUPPORTED_LANGUAGES.some(lang => lang.code === languageCode)) {
        localStorage.setItem('language', languageCode);
        document.documentElement.lang = languageCode;
        return true;
    }
    return false;
}

// 获取翻译文本
export function getTranslation(key, language = getCurrentLanguage()) {
    const keys = key.split('.');
    let translation = translations[language];
    
    for (const k of keys) {
        if (!translation || !translation[k]) {
            // 如果找不到翻译，返回英文版本
            if (language !== 'en') {
                return getTranslation(key, 'en');
            }
            // 如果英文版本也没有，返回键名
            return key;
        }
        translation = translation[k];
    }
    
    return translation;
}

// 更新页面上的所有翻译文本
export function updatePageTranslations() {
    const language = getCurrentLanguage();
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key, language);
        
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
        element.title = getTranslation(key, language);
    });
    
    // 更新所有带有 data-i18n-alt 属性的元素
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        element.alt = getTranslation(key, language);
    });
    
    // 触发语言变更事件
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
}

// 初始化多语言支持
export function initI18n() {
    // 设置初始语言
    const currentLanguage = getCurrentLanguage();
    document.documentElement.lang = currentLanguage;
    
    // 更新页面翻译
    updatePageTranslations();
    
    // 监听语言变更事件
    document.addEventListener('languageChanged', () => {
        updatePageTranslations();
    });
} 