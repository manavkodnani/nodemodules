--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: todo; Type: TABLE; Schema: public; Owner: manavkodnani
--

CREATE TABLE todo (
    description text NOT NULL,
    status boolean DEFAULT false NOT NULL,
    id integer NOT NULL
);


ALTER TABLE todo OWNER TO manavkodnani;

--
-- Name: todo_id_seq; Type: SEQUENCE; Schema: public; Owner: manavkodnani
--

CREATE SEQUENCE todo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE todo_id_seq OWNER TO manavkodnani;

--
-- Name: todo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: manavkodnani
--

ALTER SEQUENCE todo_id_seq OWNED BY todo.id;


--
-- Name: todo id; Type: DEFAULT; Schema: public; Owner: manavkodnani
--

ALTER TABLE ONLY todo ALTER COLUMN id SET DEFAULT nextval('todo_id_seq'::regclass);


--
-- Data for Name: todo; Type: TABLE DATA; Schema: public; Owner: manavkodnani
--

COPY todo (description, status, id) FROM stdin;
Revise lessons	f	135
Write a blog	f	136
Buy vegetables	t	134
\.


--
-- Name: todo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: manavkodnani
--

SELECT pg_catalog.setval('todo_id_seq', 136, true);


--
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: manavkodnani
--

ALTER TABLE ONLY todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

