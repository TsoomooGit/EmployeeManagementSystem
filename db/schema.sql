
CREATE DATABASE homework10;
use homework10;

CREATE TABLE department(
    id INTEGER NOT NULL,
    department VARCHAR(30),
    PRIMARY KEY (id)
);
CREATE TABLE roles(
 id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
 id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager INTEGER,
    PRIMARY KEY (id)
);
