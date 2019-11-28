INSERT INTO company (name, logo) VALUES ('Avengers', 'https://i.imgur.com/pW95cxd.png');
INSERT INTO company (name, logo) VALUES ('DC Comics', 'https://upload.wikimedia.org/wikipedia/commons/3/3d/DC_Comics_logo.svg');

INSERT INTO users (username, name, email, password, nationality, ethnic, birthdate, admin) VALUES ('S7368844B', 'Captain America', 'capam@avengers.com', '8ceb2670a117311d9fb90b3eac6f2c829ac869b1ac54960d04840fe85f7fe43a', 'American', 'Others', '1975-07-04', true);
INSERT INTO users (username, name, email, password) VALUES ('S6252336I', 'Iron Man', 'ironman@avengers.com', 'e3582b3af92922ac2bfbfcfcc9275c88798224a95df55626c16493aff937fbed', 'Singaporean', 'Chinese', '1970-05-29', false);
INSERT INTO users (username, name, email, password) VALUES ('S5780731Z', 'Batman', 'batman@dccomics.com', '4567d3b9bf0fefaba80eea5549c3c05b3e5d28bd3517b4a55509f1f7fd189046', 'Singaporean', 'Indian', '1990-08-05', false);
INSERT INTO users (username, name, email, password) VALUES ('S5272575C', 'Joker', 'joker@dccomics.com', 'eee2216d37b4a9517a9ed675e9fb8cfe124baffa6411c7e5d14cf4c9f82d172f', 'Singaporean', 'Malay', '1979-04-04', true);

INSERT INTO company_employees (company_id, user_id) VALUES (1, 1);
INSERT INTO company_employees (company_id, user_id) VALUES (1, 2);
INSERT INTO company_employees (company_id, user_id) VALUES (2, 3);
INSERT INTO company_employees (company_id, user_id) VALUES (2, 4);