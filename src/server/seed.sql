INSERT INTO company (name, logo) VALUES ('Avengers', 'https://i.imgur.com/pW95cxd.png');
INSERT INTO company (name, logo) VALUES ('DC Comics', 'https://upload.wikimedia.org/wikipedia/commons/3/3d/DC_Comics_logo.svg');

INSERT INTO users (username, name, email, password, nationality, ethnic, birthdate, admin) VALUES ('S7368844B', 'Captain America', 'capam@avengers.com', PLACEHOLDER, 'American', 'Others', '1975-07-04', True);
INSERT INTO users (username, name, email, password) VALUES ('S6252336I', 'Iron Man', 'ironman@avengers.com', PLACEHOLDER, 'Singaporean', 'Chinese', '1970-05-29', False);
INSERT INTO users (username, name, email, password) VALUES ('S5780731Z', 'Batman', 'batman@dccomics.com', PLACEHOLDER, 'Singaporean', 'Indian', '1990-08-05', False);
INSERT INTO users (username, name, email, password) VALUES ('S5272575C', 'Joker', 'joker@dccomics.com', PLACEHOLDER, 'Singaporean', 'Malay', '1979-04-04', True);

INSERT INTO company_employees (company_id, user_id) VALUES (1, 1);
INSERT INTO company_employees (company_id, user_id) VALUES (1, 2);
INSERT INTO company_employees (company_id, user_id) VALUES (2, 3);
INSERT INTO company_employees (company_id, user_id) VALUES (2, 4);