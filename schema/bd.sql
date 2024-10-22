CREATE TABLE Preferences (
    pid SERIAL PRIMARY KEY,
    description TEXT
);

CREATE TABLE Users (
    uid SERIAL PRIMARY KEY,
    firstName VARCHAR(256),
    lastName VARCHAR(256),
    email VARCHAR(256),
    password VARCHAR(256)
);

CREATE TABLE PreferencesMapping (
    pmid SERIAL PRIMARY KEY,
    pid INTEGER REFERENCES Preferences(pid),
    uid INTEGER REFERENCES Users(uid)
);

CREATE TABLE Roles (
    rid SERIAL PRIMARY KEY,
    description TEXT
);

CREATE TABLE Companies (
    cid SERIAL PRIMARY KEY,
    name VARCHAR(256),
    date DATE
);

CREATE TABLE UserMapping (
    umid SERIAL PRIMARY KEY,
    uid INTEGER REFERENCES Users(uid),
    cid INTEGER REFERENCES Companies(cid),
    rid INTEGER REFERENCES Roles(rid) null
);

CREATE TABLE Zones (
    zid SERIAL PRIMARY KEY,
    name VARCHAR(256),
    location TEXT
);

CREATE TABLE Supervisions (
    sid SERIAL PRIMARY KEY,
    cid INTEGER REFERENCES Companies(cid),
    zid INTEGER REFERENCES Zones(zid)
);

CREATE TABLE Images (
    iid SERIAL PRIMARY KEY,
    zid INTEGER REFERENCES Zones(zid),
    date DATE,
    description TEXT,
    url TEXT
);
