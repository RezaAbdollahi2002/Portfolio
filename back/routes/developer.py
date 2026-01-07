from fastapi import APIRouter, UploadFile, File, Depends, Form, HTTPException, status
from sqlalchemy.orm import Session
import os
import models
import schemas
from database import get_db
from datetime import date

router = APIRouter(prefix="/developer", tags=["Developer"])

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "..", "uploads", "developer", "resume")
PRO_UPLOAD_DIR = os.path.join(BASE_DIR,"..", "upload", "developer", "profilePic")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PRO_UPLOAD_DIR, exist_ok=True)

@router.post("/create", response_model=schemas.DeveloperCreate)
def create_developer(
    first_name: str = Form(...),
    last_name: str = Form(...),
    dob: date = Form(...),
    phone_number: str = Form(...),
    email: str = Form(...),
    profile_picture: UploadFile = File(None),
    resume: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    resume_url = None
    profile_url = None


    if profile_picture:
        filename = profile_picture.filename
        file_path = os.path.join(PRO_UPLOAD_DIR, filename)

        with open(file_path, "wb") as f:
            f.write(profile_picture.file.read())

        profile_url = f"static/developer/profilePic/{filename}"


    if resume:
        filename = resume.filename
        file_path = os.path.join(UPLOAD_DIR, filename)

        with open(file_path, "wb") as f:
            f.write(resume.file.read())

        resume_url = f"static/developer/resume/{filename}"

    new_developer = models.Developer(
        first_name=first_name,
        last_name=last_name,
        dob=dob,
        phone_number=phone_number,
        email=email,
        profile_picture=profile_url,
        resume=resume_url
    )

    db.add(new_developer)
    db.commit()
    db.refresh(new_developer)

    return new_developer


@router.post("/add/resume")
def add_resume(
    email: str = Form(...),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    developer = db.query(models.Developer).filter(
        models.Developer.email == email
    ).first()

    if developer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Developer not found"
        )

    filename = resume.filename
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as f:
        f.write(resume.file.read())

    developer.resume = f"static/developer/resume/{filename}"

    db.commit()
    db.refresh(developer)

    return {
        "message": "Resume uploaded successfully",
        "resume_url": developer.resume
    }
    
@router.put("/update/developer", response_model=schemas.DeveloperCreate)
def update_developer(email: str = Form(...), resume: UploadFile = File(None), db: Session = Depends(get_db)):
    developer = db.query(models.Developer).filter(models.Developer.email == email).first()
    if developer is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Developer was not found")

    if resume:
        filename = resume.filename
        file_path = os.path.join(UPLOAD_DIR, filename)

        with open(file_path, "wb") as f:
            f.write(resume.file.read())

        developer.resume = f"static/developer/resume/{filename}"

    db.commit()
    db.refresh(developer)
    return developer

@router.get("/get/developer/{email}",response_model=schemas.DeveloperCreate )
def get_developer(email:str,db:Session=Depends(get_db)):
    resume = db.query(models.Developer).filter(models.Developer.email == email).first()
    if resume is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Developer was not found")
    return {"resume": resume}

@router.get("/get/resume/{email}")
def get_developer(email:str,db:Session=Depends(get_db)):
    developer = db.query(models.Developer).filter(models.Developer.email == email).first().resume
    if developer is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Developer was not found")
    return developer


@router.delete("/remove/developer/{email}")
def remove_developer(email:str,db:Session=Depends(get_db)):
    developer = db.query(models.Developer).filter(models.Developer.email == email).first()
    if developer is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Developer was not found")
    db.delete(developer)
    db.commit()
    return {"detail" : "Developer was removed!"}
