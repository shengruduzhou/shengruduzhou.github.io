% Adapted from billryan/resume (https://github.com/billryan/resume).
% Original author(s): billryan/resume contributors; original license: MIT.
% Changes: use system Latin Modern fonts (no bundled font files), a compact
% academic layout, and refined spacing while retaining the original conventions
% (small-cap name/section titles, Font Awesome, dated entries, separator rules).
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}[2026/11/18 Academic CV based on billryan/resume]
\LoadClass[10pt,a4paper]{article}
\RequirePackage[a4paper,left=19.7mm,right=19.7mm,top=17.8mm,bottom=17.4mm,nohead]{geometry}
\RequirePackage{fontspec}
\setmainfont[BoldFont=lmroman10-bold.otf,ItalicFont=lmroman10-italic.otf,BoldItalicFont=lmroman10-bolditalic.otf,SmallCapsFont=lmromancaps10-regular.otf]{lmroman10-regular.otf}
\RequirePackage{fontawesome}
\RequirePackage{hyperref}
\hypersetup{hidelinks}
\RequirePackage{titlesec}
\RequirePackage{enumitem}
\RequirePackage{needspace}
\RequirePackage{microtype}
\RequirePackage{xcolor}
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}
\pagestyle{empty}
\linespread{1.07}
\setlength{\emergencystretch}{1.3em}
\titleformat{\section}{\fontsize{12.0pt}{14pt}\selectfont\scshape\raggedright}{}{0pt}{}[\vspace{-3pt}\titlerule]
\titlespacing*{\section}{0pt}{10.3pt}{5.6pt}
\setlist[itemize]{leftmargin=4.9mm,topsep=1.7pt,itemsep=1.0pt,parsep=0pt,partopsep=0pt}
\newcommand{\name}[1]{\begin{center}\fontsize{24pt}{28pt}\selectfont\scshape #1\end{center}\vspace{-5.0pt}}
\newcommand{\basicInfo}[1]{\begin{center}\fontsize{9.4pt}{11.3pt}\selectfont #1\end{center}\vspace{-5.8pt}}
\newcommand{\secondInfo}[1]{\begin{center}\fontsize{9.15pt}{10.7pt}\selectfont #1\end{center}\vspace{-6.0pt}}
\newcommand{\sectionwithicon}[2]{\section{\texorpdfstring{{\normalfont #1}\ }{}#2}}
\newcommand{\datedsubsection}[2]{\needspace{27pt}\par\noindent\textbf{#1}\hfill{\small #2}\par}
\newcommand{\role}[1]{\textit{#1}\par}
\newcommand{\cvproj}[4]{%
  \needspace{46pt}
  \datedsubsection{#1}{#2}%
  \role{#3}%
  \begin{itemize}\item #4\end{itemize}%
  \vspace{0.4pt}%
}
