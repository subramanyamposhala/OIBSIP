document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    const display = document.getElementById('result');
    let ans = '';
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'clear') {
                display.value = '';
            } else if (value === 'del') {
                display.value = display.value.slice(0, -1);
            } else if (value === 'ENTER') {
                try {
                
                    let expression = display.value
                        .replace(/×/g, '*')
                        .replace(/÷/g, '/')
                        .replace(/%/g, '/100')
                        .replace(/√/g, 'Math.sqrt');
                    
                
                    display.value = eval(expression);
                    ans = display.value;
                } catch {
                    display.value = 'Error';
                }
            } else if (value === 'ans') {
                display.value += ans;
            } else if (value === '+/-') {
                if (display.value.charAt(0) === '-') {
                    display.value = display.value.slice(1);
                } else {
                    display.value = '-' + display.value;
                }
            } else {
                display.value += value;
            }
        });
    });
});
