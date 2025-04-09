// 导入 i18n 实例
import i18n from './i18n.js';

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化多语言功能
    initI18n();
});

// 初始化多语言功能
function initI18n() {
    // 初始化语言切换按钮
    initLanguageButtons();
    
    // 更新页面内容
    i18n.updatePageContent();
    
    // 监听语言变化事件
    window.addEventListener('languageChanged', () => {
        i18n.updatePageContent();
    });
}

// 初始化语言切换按钮
function initLanguageButtons() {
    const languageButtons = document.querySelectorAll('.language-button');
    
    languageButtons.forEach(button => {
        // 设置当前语言的按钮为激活状态
        if (button.dataset.lang === i18n.currentLang) {
            button.classList.add('active');
        }
        
        // 添加点击事件监听器
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            if (i18n.supportedLangs.includes(lang)) {
                // 切换语言
                i18n.changeLanguage(lang);
                
                // 更新按钮状态
                updateLanguageButtons();
                
                // 触发语言变化事件
                window.dispatchEvent(new Event('languageChanged'));
            }
        });
    });
}

// 更新语言按钮状态
function updateLanguageButtons() {
    const languageButtons = document.querySelectorAll('.language-button');
    
    languageButtons.forEach(button => {
        if (button.dataset.lang === i18n.currentLang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// 导出初始化函数
export { initI18n }; 