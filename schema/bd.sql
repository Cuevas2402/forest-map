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

CREATE TABLE Access (
    acid SERIAL PRIMARY KEY,
    uid INTEGER REFERENCES Users(uid),
    sid INTEGER REFERENCES Supervisions(sid),
    date DATE,
    status VARCHAR(32)
);

CREATE TABLE UserMapping (
    uimid SERIAL PRIMARY KEY,
    uid INTEGER REFERENCES Users(uid),
    cid INTEGER REFERENCES Companies(cid),
    rid INTEGER REFERENCES Roles(rid),
    date DATE,
    status VARCHAR(32)
);


CREATE TABLE Companies (
    cid SERIAL PRIMARY KEY,
    name VARCHAR(256),
    date DATE
);

CREATE TABLE Supervisions (
    sid SERIAL PRIMARY KEY,
    cid INTEGER REFERENCES Companies(cid),
    zid INTEGER REFERENCES Zones(zid),
    date DATE,
    status VARCHAR(32)
);


CREATE TABLE Zones (
    zid SERIAL PRIMARY KEY,
    fid INTEGER REFERENCES Forest(fid),
    name VARCHAR(256),
    location TEXT
);

CREATE TABLE Forest (
    fid SERIAL PRIMARY KEY,
    name VARCHAR(256),
    location TEXT
);

CREATE TABLE Actions (
    aid SERIAL PRIMARY KEY,
    uid INTEGER REFERENCES Users(uid),
    date DATE,
    description TEXT
);

CREATE TABLE Roles (
    rid SERIAL PRIMARY KEY,
    description TEXT
);

CREATE TABLE Owners (
    oid SERIAL PRIMARY KEY,
    cid INTEGER REFERENCES Companies(cid),
    did INTEGER REFERENCES Drones(did),
    date DATE,
    status VARCHAR(32)
);

CREATE TABLE Drones (
    did SERIAL PRIMARY KEY,
    model TEXT,
    date DATE,
    description TEXT
);

CREATE TABLE Routes (
    rid SERIAL PRIMARY KEY,
    did INTEGER REFERENCES Drones(did),
    aid INTEGER REFERENCES Analysis(aid),
    date DATE,
    status VARCHAR(32)
);

CREATE TABLE Analysis (
    aid SERIAL PRIMARY KEY,
    zid INTEGER REFERENCES Zones(zid),
    date DATE
);
