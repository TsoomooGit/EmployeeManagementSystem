INSERT INTO department(id,department) VALUES (301, "Sales");
INSERT INTO department(id,department) VALUES (302, "Finance");
INSERT INTO department(id,department) VALUES (300, "Engineering");

INSERT INTO roles(title,salary,department_id) VALUES ("QA engineer", 100000,300);
INSERT INTO roles(title,salary,department_id) VALUES ("Sales manager", 90000,301);
INSERT INTO roles(title,salary,department_id) VALUES ("Client manager", 130000,302);
INSERT INTO roles(title,salary,department_id) VALUES ("Financial engineering",125000,300);

INSERT INTO employee(first_name, last_name, role_id,manager) VALUES ("Tsolmon", "Baasandorj",1,4);
INSERT INTO employee(first_name, last_name, role_id,manager) VALUES ("Sheenal", "Patel",3,3);
INSERT INTO employee(first_name, last_name, role_id,manager) VALUES ("Kuba", "Zhaanbaev",2,4);
INSERT INTO employee(first_name, last_name, role_id,manager) VALUES ("Albert", "Luu",4,2);