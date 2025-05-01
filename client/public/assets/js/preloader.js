    const txt = ['Креатив...']
    const cursor = document.querySelector('.c-text-cursor').innerHTML
    const cursorObj = document.querySelector('.c-text-cursor')


    function typeText() {
        let line = 0;
        let count = 0;
        let out = '';
        let htmlOut = document.querySelector('.c-out')

        function typeLine() {
            let interval = setTimeout(() => {
                out += txt[line][count];
                htmlOut.innerHTML = out + cursor;
                count++;
                if (count >= txt[line].length) {
                    count = 0;
                    line++;
                    if (line == txt.length) {
                        clearTimeout(interval);
                        htmlOut.innerHTML = out;
                        cursorObj.classList.add('active-cursor')
                        return true

                    }

                }

                typeLine();
            }, 100)
        }
        typeLine();

    }
          typeText();
    setInterval(() => {
        cursorObj.classList.remove('active-cursor')
        typeText();
    },3000)