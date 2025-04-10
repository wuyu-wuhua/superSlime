// 多语言工具函数
import translations from './translations.js';

// 当前语言
let currentLanguage = 'en';

// 获取当前语言
export function getCurrentLanguage() {
    return currentLanguage;
}

// 设置当前语言
export function setCurrentLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        // 保存语言设置到本地存储
        localStorage.setItem('preferred_language', lang);
        // 触发语言变更事件
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
}

// 获取翻译文本
export function getText(key) {
    const keys = key.split('.');
    let text = translations[currentLanguage];
    
    for (const k of keys) {
        if (text && text[k]) {
            text = text[k];
        } else {
            console.warn(`Translation key not found: ${key}`);
            return key;
        }
    }
    
    return text;
}

// 更新页面上的所有翻译文本
export function updatePageContent() {
    // 查找所有带有 data-i18n 属性的元素
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = getText(key);
        
        // 根据元素类型更新内容
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
    
    // 更新页面标题
    const titleElement = document.querySelector('title');
    if (titleElement && titleElement.hasAttribute('data-i18n')) {
        const titleKey = titleElement.getAttribute('data-i18n');
        titleElement.textContent = getText(titleKey);
    }
    
    // 更新 meta 描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && metaDescription.hasAttribute('data-i18n')) {
        const descKey = metaDescription.getAttribute('data-i18n');
        metaDescription.setAttribute('content', getText(descKey));
    }
}

// 初始化语言设置
export function initLanguage() {
    // 从本地存储获取首选语言
    const savedLanguage = localStorage.getItem('preferred_language');
    
    // 如果没有保存的语言设置，尝试使用浏览器语言
    if (!savedLanguage) {
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
            setCurrentLanguage(browserLang);
        }
    } else {
        setCurrentLanguage(savedLanguage);
    }
    
    // 更新页面内容
    updatePageContent();
}

// 导出所有工具函数
export default {
    getCurrentLanguage,
    setCurrentLanguage,
    getText,
    updatePageContent,
    initLanguage
}; 