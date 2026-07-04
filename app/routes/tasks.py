from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import schemas, models
from app.database import get_db

router = APIRouter()


@router.post("/tasks")
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):

    new_task = models.Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        status=task.status,
        user_id=1
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return {
        "message": "Task Created Successfully",
        "task": new_task
    }

@router.get("/tasks")
def get_all_tasks(db: Session = Depends(get_db)):

    tasks = db.query(models.Task).all()

    return {
        "tasks": tasks
    }  


@router.get("/tasks/{id}")
def get_task(id: int, db: Session = Depends(get_db)):

    task = db.query(models.Task).filter(
        models.Task.id == id
    ).first()

    if task is None:
        return {
            "message": "Task Not Found"
        }

    return task



@router.put("/tasks/{id}")
def update_task(id: int, updated_task: schemas.TaskUpdate, db: Session = Depends(get_db)):

    task = db.query(models.Task).filter(
        models.Task.id == id
    ).first()

    if task is None:
        return {
            "message": "Task Not Found"
        }

    task.title = updated_task.title
    task.description = updated_task.description
    task.priority = updated_task.priority
    task.status = updated_task.status

    db.commit()
    db.refresh(task)

    return {
        "message": "Task Updated Successfully",
        "task": task
    } 


@router.delete("/tasks/{id}")
def delete_task(id: int, db: Session = Depends(get_db)):

    task = db.query(models.Task).filter(
        models.Task.id == id
    ).first()

    if task is None:
        return {
            "message": "Task Not Found"
        }

    db.delete(task)
    db.commit()

    return {
        "message": "Task Deleted Successfully"
    }