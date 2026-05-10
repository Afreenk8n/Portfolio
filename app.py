
from flask import Flask, render_template, request, redirect, url_for
from dotenv import load_dotenv
from flask_mail import Mail, Message
import os

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv("EMAIL_ADDRESS")
app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_PASSWORD")

mail = Mail(app)
# email = request.form.get("email")
profile = {
    "name": "Afreen Khan",
    "headline": "B.Tech IT Student",
    "email": "afreenk1347@gmail.com",
    "phone": "+91 7783066334",
    "linkedin": "https://linkedin.com/in/afreen-khan-00b28a375",
    "github": "https://github.com/Afreenk8n",
    "about_paragraphs": [
        "I am a B.Tech IT student at Banasthali Vidyapith with a deep passion for programming, data, and building innovative software solutions.",
        "My journey in technology is driven by curiosity. I love exploring new technologies and constantly pushing myself to learn more.",
        "Beyond writing code, I strongly believe in giving back to the community and contributing through social impact initiatives.",
    ],
}

skills_data = {
    "Programming": ["Python", "C", "C++","JavaScript"],
    "Databases & Tools": ["SQL", "MySQL", "PostgreSQL", "MS-Excel", "Power BI"],
    "Core Concepts": ["DBMS", "OOPs", "Data Structures", "Algorithms"],
    "Languages": ["English", "Hindi"],
}
education_data = [
    {
        "period": "2024 - Present",
        "degree": "Bachelors of Technology (Information Technology)",
        "school": "Banasthali Vidyapith, Rajasthan",
        "score": "CGPA: 8.99",
    },
    {
        "period": "2023",
        "degree": "Senior Secondary (Class XII)",
        "school": "Aadarsh Vikas Vidyalaya, Patna",
        "score": "Percentage: 82%",
    },
    {
        "period": "2021",
        "degree": "Senior Secondary (Class X)",
        "school": "D.A.V Public School, Gaya",
        "score": "Percentage: 86%",
    },
]

projects_data = [
    {
        "id": "01",
        "title": "Groundops Safety Simulator",
        "icon": "bi-airplane",
        "summary": "A comprehensive browser based airport ground operations simulator designed to enhance safety protocols and ATC coordination.",
        "description": [
            "Live ground frequency logging",
            "Interactive ATC command interface (hold, continue, enter/exit runway)",
            "Detailed 2D airport layout mapping taxiways and runways",
        ],
        # "link": "#",
        "tech": ["C++", "WebAssembly", "JavaScript", "HTML", "CSS"],
    },
    {
        "id": "02",
        "title": "Profanity Detection Keyboard",
        "icon": "bi-keyboard",
        "summary": "An AI powered keyboard system that detects and prevents the submission of offensive words in real time.",
        "description": [
            "Real time offensive content detection",
            "Pre submission warning mechanism",
            "Robustly tested on labeled text datasets",
        ],
        # "link": "#",
        "tech": ["Python", "Node.js", "JavaScript", "HTML", "CSS"],
    },
]

responsibilities = [
    "NSS Volunteer - Contributed to social awareness campaigns and service activities under the National Service Scheme."
]


def render_portfolio_page(active_page, contact_success=False):
    return render_template(
        "index.html",
        active_page=active_page,
        profile=profile,
        skills=skills_data,
        # about_highlights=about_highlights,
        education=education_data,
        projects=projects_data,
        responsibilities=responsibilities,
        contact_success=contact_success,
    )

@app.route("/")
def home():

    return render_template(
        "index.html",
        profile=profile,
        skills=skills_data,
        education=education_data,
        projects=projects_data,
        responsibilities=responsibilities,
        contact_success=False,
    )
# @app.route("/", methods=["GET", "POST"])
# def home():

#     contact_success = False

#     if request.method == "POST":

#         name = request.form.get("name", "").strip()
#         sender_email = request.form.get("email", "").strip()
#         message = request.form.get("message", "").strip()

#         if name and sender_email and message:

#             try:
#                 msg = Message(
#                        subject=f"Portfolio Message from {name}",
#                        sender=("Afreen Portfolio", os.getenv("EMAIL_ADDRESS")),
#                        recipients=[os.getenv("EMAIL_ADDRESS")],
#                        reply_to=sender_email
#                  )               
#                 msg.body = f"""
# You received a new portfolio contact message.

# ━━━━━━━━━━━━━━━━━━

# Name: {name}

# Email: {sender_email}

# Message:
# {message}

# ━━━━━━━━━━━━━━━━━━

# Sent from your Portfolio Website
# """

#                 mail.send(msg)

#                 contact_success = True
#                 # return ("", 204)

#             except Exception as e:
#                 print("EMAIL ERROR:", e)
#                 contact_success = False

#     return render_template(
#         "index.html",
#         profile=profile,
#         skills=skills_data,
#         education=education_data,
#         projects=projects_data,
#         responsibilities=responsibilities,
#         contact_success=contact_success,
#     )


if __name__ == "__main__":
    app.run()