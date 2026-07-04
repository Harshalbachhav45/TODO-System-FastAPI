from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import schemas, models
from app.database import get_db

router = APIRouter()


@router.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):

    new_user = models.User(
        username=user.username,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "user": new_user
    }


@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if db_user is None:
        return {
            "message": "User not found"
        }

    if db_user.password != user.password:
        return {
            "message": "Incorrect Password"
        }

    return {
        "message": "Login Successful"
    }


@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    # Find user by email
    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    # Check if user exists
    if db_user is None:
        return {
            "message": "User not found"
        }

    # Check password
    if db_user.password != user.password:
        return {
            "message": "Incorrect Password"
        }

    # Login successful
    return {
        "message": "Login Successful",
        "user": {
            "id": db_user.id,
            "username": db_user.username,
            "email": db_user.email
        }
    }  