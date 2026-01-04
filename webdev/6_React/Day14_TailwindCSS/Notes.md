# 📘 Tailwind CSS – Everyday Utility Classes Reference
> Common Tailwind CSS classes with pixel equivalents & brief explanations

---

## 📐 Spacing Scale (Used by Margin & Padding)

| Value | rem | px |
|------|-----|----|
| 0 | 0 | 0px |
| 0.5 | 0.125rem | 2px |
| 1 | 0.25rem | 4px |
| 2 | 0.5rem | 8px |
| 3 | 0.75rem | 12px |
| 4 | 1rem | 16px |
| 5 | 1.25rem | 20px |
| 6 | 1.5rem | 24px |
| 8 | 2rem | 32px |
| 10 | 2.5rem | 40px |
| 12 | 3rem | 48px |

---

## 📦 Padding

p-4        → padding: 16px  
px-4       → padding-left & right  
py-2       → padding-top & bottom  
pt-4 pb-6  → padding-top / padding-bottom  

---

## 📦 Margin

m-4        → margin: 16px  
mx-auto    → horizontal center  
mt-6 mb-4  → margin-top / margin-bottom  

---

## 🧱 Display

block         → display: block  
inline        → display: inline  
inline-block  → inline with width/height  
hidden        → display: none  

---

## 🧭 Position

relative  → relative to itself  
absolute  → relative to nearest positioned parent  
fixed     → relative to viewport  
sticky    → sticks on scroll  

top-0 left-0 right-0 bottom-0  
inset-0 → all sides 0  

z-10 z-20 z-50 → stack order  

---

## 📦 Flexbox

flex → display: flex  

flex-row → horizontal  
flex-col → vertical  

items-start   → align-items: start  
items-center  → align-items: center  
items-end     → align-items: end  

justify-start  
justify-center  
justify-between  
justify-around  

gap-2 → 8px gap  
gap-4 → 16px gap  

---

## 🔲 Grid

grid → display: grid  

grid-cols-1 → 1 column  
grid-cols-2 → 2 columns  
grid-cols-3 → 3 columns  
grid-cols-4 → 4 columns  

gap-2 → 8px  
gap-4 → 16px  

col-span-2 → spans 2 columns  
row-span-2 → spans 2 rows  

---

## 🖋️ Typography – Font Size

text-xs   → 12px  
text-sm   → 14px  
text-base → 16px  
text-lg   → 18px  
text-xl   → 20px  
text-2xl  → 24px  
text-3xl  → 30px  
text-4xl  → 36px  

---

## 🖋️ Font Weight

font-light     → 300  
font-normal    → 400  
font-medium    → 500  
font-semibold  → 600  
font-bold      → 700  

---

## 🖋️ Text Alignment

text-left  
text-center  
text-right  

---

## 🖋️ Line Height

leading-tight  
leading-normal  
leading-loose  

---

## 🎨 Text Color

text-black  
text-white  
text-gray-500  
text-red-500  
text-blue-500  
text-green-500  

---

## 🎨 Background Color

bg-white  
bg-black  
bg-gray-100  
bg-red-500  
bg-blue-500  
bg-green-500  

---

## 🎨 Gradient

bg-gradient-to-r  
from-blue-500 to-purple-500  

---

## 🧩 Borders

border     → 1px  
border-2   → 2px  
border-4   → 4px  

border-gray-300  
border-blue-500  
border-red-500  

---

## 🧩 Border Radius

rounded-sm   → 2px  
rounded      → 4px  
rounded-md   → 6px  
rounded-lg   → 8px  
rounded-xl   → 12px  
rounded-full → circle  

---

## 🌫️ Shadow

shadow-sm  
shadow  
shadow-md  
shadow-lg  
shadow-xl  

---

## 📏 Width

w-full     → 100%  
w-screen   → 100vw  
w-1/2      → 50%  
w-1/3      → 33%  

---

## 📏 Height

h-full  
h-screen  
min-h-screen  

---

## 🧪 Opacity & Visibility

opacity-0  
opacity-50  
opacity-100  

hidden  
invisible  

---

## 🖱️ Cursor & Interaction

cursor-pointer  
cursor-not-allowed  
select-none  

---

## 🔄 Transition

transition  
transition-all  

duration-200 → 200ms  
duration-300 → 300ms  
duration-500 → 500ms  

ease-in  
ease-out  
ease-in-out  

---

## 🎞️ Animation

animate-spin  
animate-pulse  
animate-bounce  

---

## 🎯 Hover / Focus / Active

hover:bg-blue-600  
hover:text-white  
hover:scale-105  

focus:outline-none  
focus:ring-2  
focus:ring-blue-500  

active:scale-95  

---

## 📱 Responsive Breakpoints

sm → ≥ 640px  
md → ≥ 768px  
lg → ≥ 1024px  
xl → ≥ 1280px  

Example:  
text-sm md:text-lg lg:text-xl  
flex-col md:flex-row  

---

## 🌙 Dark Mode

dark:bg-black  
dark:text-white  
dark:border-gray-700  

---

## 🔘 Common Button Pattern

px-4 py-2  
bg-blue-500 text-white  
rounded-md  
shadow-md  
hover:bg-blue-600  
transition duration-300  

---

## ✅ Most Used Daily Combo

flex items-center justify-center  
p-4  
rounded-lg  
shadow-md  
bg-white  

---

## 📌 Tip

80% of UI uses:  
flex + spacing + text + color + hover  
