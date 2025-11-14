        // Zodiac Signs Array (12 months)
        const zodiacSigns = [
            { sign: "Capricorn ♑", desc: "Ambitious, disciplined, and patient. You're a natural leader with strong determination." },
            { sign: "Aquarius ♒", desc: "Independent, progressive, and humanitarian. You think outside the box and value freedom." },
            { sign: "Pisces ♓", desc: "Compassionate, intuitive, and artistic. You have a deep emotional understanding of the world." },
            { sign: "Aries ♈", desc: "Confident, courageous, and energetic. You're a natural pioneer who loves taking initiative." },
            { sign: "Taurus ♉", desc: "Reliable, patient, and devoted. You appreciate beauty and have strong willpower." },
            { sign: "Gemini ♊", desc: "Adaptable, curious, and expressive. You love communication and learning new things." },
            { sign: "Cancer ♋", desc: "Nurturing, intuitive, and protective. You're deeply emotional and value home and family." },
            { sign: "Leo ♌", desc: "Confident, creative, and generous. You have natural charisma and love to shine." },
            { sign: "Virgo ♍", desc: "Analytical, practical, and hardworking. You pay attention to details and strive for perfection." },
            { sign: "Libra ♎", desc: "Diplomatic, fair-minded, and social. You seek harmony and balance in all things." },
            { sign: "Scorpio ♏", desc: "Passionate, resourceful, and brave. You have intense emotions and great inner strength." },
            { sign: "Sagittarius ♐", desc: "Optimistic, adventurous, and philosophical. You love freedom and exploring new horizons." }
        ];

        // Daily Recommendations (31 days)
        const dailyRecommendations = [
            "Today is perfect for new beginnings. Take that leap of faith!",
            "Focus on self-care today. Your well-being matters most.",
            "Communication is key today. Express your feelings openly.",
            "Trust your intuition. Your inner voice knows the way.",
            "A surprise opportunity may come your way. Stay alert!",
            "Practice gratitude today. Count your blessings.",
            "Your creativity is at its peak. Start that project!",
            "Take time to reconnect with old friends today.",
            "Financial gains are on the horizon. Stay patient.",
            "Love is in the air. Open your heart to possibilities.",
            "Today calls for courage. Face your fears head-on.",
            "Rest and reflection will bring clarity today.",
            "Your hard work will soon pay off. Keep going!",
            "Adventure awaits! Try something completely new.",
            "Focus on building stronger relationships today.",
            "Your wisdom will guide someone today. Be generous.",
            "Take a moment to appreciate nature's beauty.",
            "Today is ideal for learning something new.",
            "Trust in the process. Everything happens for a reason.",
            "Your positive energy will attract good fortune.",
            "Balance is essential today. Don't overcommit.",
            "A long-awaited answer will come to you soon.",
            "Your kindness will create a ripple effect today.",
            "Focus on your goals. Success is within reach.",
            "Listen more than you speak today. Understanding awaits.",
            "Your confidence will inspire others around you.",
            "Today is perfect for making important decisions.",
            "Embrace change. It leads to growth and new opportunities.",
            "Your patience will be rewarded in unexpected ways.",
            "Take time for meditation or quiet reflection today.",
            "Your authentic self is your greatest strength. Shine!"
        ];

        // Victim Card Insights (35 statements)
        const victimInsights = [
            "You give too much to people who don't appreciate you.",
            "They take your kindness for granted, but karma sees all.",
            "You're always there for them, but they disappear when you need them.",
            "Your loyalty is wasted on those who don't value it.",
            "They ignore your efforts until they need something from you.",
            "You deserve better than people who only remember you when convenient.",
            "Your generosity is beautiful, but some people exploit it.",
            "They criticize you but copy everything you do.",
            "You forgive easily, but they never learn their lesson.",
            "Your support goes unnoticed while your mistakes are highlighted.",
            "They enjoy your company but never reciprocate the effort.",
            "You're the therapist friend, but who listens to you?",
            "They celebrate with you in success but abandon you in struggle.",
            "Your advice is sought but rarely followed or appreciated.",
            "You remember their special days, but they forget yours.",
            "They underestimate you and will regret it later.",
            "Your energy is valuable. Stop giving it to those who drain you.",
            "They envy your peace and try to disturb it.",
            "You're too good for people who make you question your worth.",
            "They love what you do for them, not who you are.",
            "Your absence will teach them your value.",
            "They took your silence as weakness, but you're just wise.",
            "You outgrew them, and they can't handle it.",
            "They want your attention but not your happiness.",
            "Your success makes them uncomfortable, not happy.",
            "You're healing from people who never apologized.",
            "They miss you only when they need you.",
            "Your growth threatens their comfort zone.",
            "You're breaking patterns that no longer serve you.",
            "They judge your journey without knowing your story.",
            "You're learning to protect your peace above all else.",
            "They expected you to stay small, but you're meant to soar.",
            "Your boundaries make selfish people uncomfortable.",
            "You're choosing yourself, and that's not selfish.",
            "They'll realize your worth when you're no longer available."
        ];

        // Future Predictions (35 statements)
        const futurePredictions = [
            "Success is on the horizon. Your efforts will bear fruit soon.",
            "A major breakthrough is coming in your career within 3 months.",
            "You will achieve a long-awaited goal by the end of this year.",
            "Financial abundance is heading your way. Stay focused.",
            "You will meet someone who changes your life perspective.",
            "A travel opportunity will open new doors for you.",
            "Your dream job is closer than you think. Keep applying!",
            "You will overcome your biggest obstacle very soon.",
            "Recognition for your hard work is coming. Be ready!",
            "A profitable business opportunity will present itself.",
            "You will find clarity in a confusing situation soon.",
            "Your health will improve significantly in coming months.",
            "A creative project will bring unexpected success.",
            "You will reconnect with someone from your past positively.",
            "Your investment decisions will pay off handsomely.",
            "You will discover a hidden talent within yourself.",
            "A mentor will appear when you need guidance most.",
            "Your relationship will enter a beautiful new phase.",
            "You will move to a better living situation soon.",
            "An educational opportunity will transform your future.",
            "Your side hustle will become your main income source.",
            "You will receive unexpected good news this month.",
            "A problem that's been bothering you will resolve itself.",
            "You will achieve a personal milestone you've been working toward.",
            "Your persistence will finally break down barriers.",
            "A collaboration will lead to mutual success.",
            "You will find the courage to pursue your passion.",
            "Your influence will grow significantly this year.",
            "A lucky break will come when you least expect it.",
            "You will heal from past wounds and feel lighter.",
            "Your ideas will gain the attention they deserve.",
            "You will make a decision that changes everything positively.",
            "Success will come from an unexpected direction.",
            "You will build something that outlasts you.",
            "Your future self will thank you for today's choices."
        ];

        // Nature Insights (35 statements)
        const natureInsights = [
            "You have a calm nature, but people mistake it for weakness.",
            "Your nature is fiery and passionate. You live life intensely.",
            "You're naturally empathetic and feel others' emotions deeply.",
            "Your nature is mysterious. People can't quite figure you out.",
            "You're adventurous by nature and hate being confined.",
            "Your nature is analytical. You think before you act.",
            "You have a gentle soul but fierce determination.",
            "Your nature is competitive. You love challenges.",
            "You're naturally optimistic and see the bright side.",
            "Your nature is protective of those you love.",
            "You're independent and prefer doing things your way.",
            "Your nature is creative. You see art in everything.",
            "You have a magnetic personality that draws people in.",
            "Your nature is practical and grounded in reality.",
            "You're spontaneous and love living in the moment.",
            "Your nature is loyal. You stick by your people.",
            "You have a philosophical nature and question everything.",
            "Your nature is ambitious. You set high goals.",
            "You're naturally intuitive and trust your gut feelings.",
            "Your nature is generous. You love giving to others.",
            "You have a perfectionist nature that drives excellence.",
            "Your nature is diplomatic. You avoid unnecessary conflict.",
            "You're resilient by nature. You bounce back from setbacks.",
            "Your nature is honest, sometimes brutally so.",
            "You have an old soul with wisdom beyond your years.",
            "Your nature is playful and you don't take life too seriously.",
            "You're naturally curious and always learning.",
            "Your nature is disciplined. You have strong self-control.",
            "You have a rebellious nature that questions authority.",
            "Your nature is nurturing. You care for others naturally.",
            "You're observant by nature and notice small details.",
            "Your nature is balanced. You seek harmony in all things.",
            "You have a bold nature and aren't afraid to stand out.",
            "Your nature is private. You keep your thoughts guarded.",
            "You're adaptable by nature and handle change well."
        ];

        // Populate day dropdown
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            document.getElementById('day').appendChild(option);
        }

        // Populate year dropdown (last 100 years)
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 100; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            document.getElementById('year').appendChild(option);
        }

        function generatePrediction() {
            const name = document.getElementById('name').value.trim();
            const gender = document.getElementById('gender').value;
            const day = Number(document.getElementById('day').value);
            const month = Number(document.getElementById('month').value);
            const year =Number(document.getElementById('year').value);

            if (!name || !gender || !day || !month || !year) {
                alert('Please fill in all fields!');
                return;
            }

            // Get zodiac sign based on month
            const zodiac = zodiacSigns[month];
            
            // Get daily recommendation based on day
            const recommendation = dailyRecommendations[day - 1];
            
            // Get random insights
            const victimInsight = victimInsights[Math.floor(Math.random()* victimInsights.length)];
            const futurePrediction = futurePredictions[(year*day*month)%futurePredictions.length];
            const natureInsight = natureInsights[(name.length*6*day)%natureInsights.length];

            // Display results
            document.getElementById('userName').textContent = name;
            document.getElementById('userDetails').textContent = `Gender: ${gender} | Born: ${day}/${parseInt(month) + 1}/${year}`;
            document.getElementById('zodiacResult').textContent = `${zodiac.sign} - ${zodiac.desc}`;
            document.getElementById('recommendationResult').textContent = recommendation;
            document.getElementById('victimResult').textContent = victimInsight;
            document.getElementById('futureResult').textContent = futurePrediction;
            document.getElementById('natureResult').textContent = natureInsight;

            // Show results and hide form
            document.getElementById('form-section').style.display = 'none';
            document.getElementById('results').style.display = 'block';
        }

        function resetForm() {
            document.getElementById('form-section').style.display = 'block';
            document.getElementById('results').style.display = 'none';
            document.getElementById('name').value = '';
            document.getElementById('gender').value = '';
            document.getElementById('day').value = '';
            document.getElementById('month').value = '';
            document.getElementById('year').value = '';
        }