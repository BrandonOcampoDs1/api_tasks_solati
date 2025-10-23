--
-- PostgreSQL database dump
--

\restrict 3jaWQW3Z0WtkWfzgLi0IUcHwqBCz0jzXxzkaT691laAg7Y2VdpnvJlxYqqXhc5h

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-10-23 12:15:18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 231 (class 1259 OID 17146)
-- Name: api_clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.api_clients (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    identifier character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.api_clients OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17145)
-- Name: api_clients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.api_clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.api_clients_id_seq OWNER TO postgres;

--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 230
-- Name: api_clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.api_clients_id_seq OWNED BY public.api_clients.id;


--
-- TOC entry 221 (class 1259 OID 17062)
-- Name: cache; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17072)
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17113)
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17112)
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO postgres;

--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 226
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- TOC entry 225 (class 1259 OID 17098)
-- Name: job_batches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE public.job_batches OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17083)
-- Name: jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17082)
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobs_id_seq OWNER TO postgres;

--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 223
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- TOC entry 220 (class 1259 OID 17053)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17052)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 219
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 232 (class 1259 OID 17162)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17132)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    status character varying(255) DEFAULT 'pendiente'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    prioridad character varying(100),
    CONSTRAINT tasks_status_check CHECK (((status)::text = ANY ((ARRAY['pendiente'::character varying, 'completada'::character varying])::text[])))
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17131)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO postgres;

--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 228
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- TOC entry 4889 (class 2604 OID 17149)
-- Name: api_clients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_clients ALTER COLUMN id SET DEFAULT nextval('public.api_clients_id_seq'::regclass);


--
-- TOC entry 4885 (class 2604 OID 17116)
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- TOC entry 4884 (class 2604 OID 17086)
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- TOC entry 4883 (class 2604 OID 17056)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 4887 (class 2604 OID 17135)
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- TOC entry 5077 (class 0 OID 17146)
-- Dependencies: 231
-- Data for Name: api_clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.api_clients (id, name, identifier, token, created_at, updated_at) FROM stdin;
1	Desarrollador	123456789	IVAfoCm2o1QikGn5D1JfjAtrd4cQk8FdEAzTGaIXPzJ9HTRpzbDQDp1zXE0X	2025-10-23 02:39:37	2025-10-23 02:39:37
\.


--
-- TOC entry 5067 (class 0 OID 17062)
-- Dependencies: 221
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cache (key, value, expiration) FROM stdin;
\.


--
-- TOC entry 5068 (class 0 OID 17072)
-- Dependencies: 222
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- TOC entry 5073 (class 0 OID 17113)
-- Dependencies: 227
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- TOC entry 5071 (class 0 OID 17098)
-- Dependencies: 225
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- TOC entry 5070 (class 0 OID 17083)
-- Dependencies: 224
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- TOC entry 5066 (class 0 OID 17053)
-- Dependencies: 220
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000001_create_cache_table	1
2	0001_01_01_000002_create_jobs_table	1
3	2025_10_22_235212_create_tasks_table	1
4	2025_10_23_021334_create_api_clients_table	1
5	2025_10_23_023922_create_sessions_table	1
\.


--
-- TOC entry 5078 (class 0 OID 17162)
-- Dependencies: 232
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
QnENSr0QB2BKM7xUHRaM8MArd2CEPQQ6z6RaYUnN	\N	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36	YTozOntzOjY6Il90b2tlbiI7czo0MDoiUnJYUUZJOGZoMTJRTHQ1djlQb1JiYzR5bXhoakZrbzBMNHVUZXRlUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly9hcGlfdGFza3Nfc29sYXRpLnRlc3QvdGFza3MiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19	1761238486
7ipFWKstdWUpfjoxNOoT0jRbokO4p7X0FquvIowc	\N	127.0.0.1	PostmanRuntime/7.49.0	YTozOntzOjY6Il90b2tlbiI7czo0MDoiWmd3RDJnbzJZVlVXVHppNHZmdHM1THBPQ1FOd0tQbFBOb2YwVmVmbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly9hcGlfdGFza3Nfc29sYXRpLnRlc3QiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19	1761236484
\.


--
-- TOC entry 5075 (class 0 OID 17132)
-- Dependencies: 229
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, title, description, status, created_at, updated_at, prioridad) FROM stdin;
6	Hacer commits	Realizar commits de lo que tengo	pendiente	2025-10-23 03:37:11	2025-10-23 03:37:11	baja
7	Respuestas de errores	Generar bien los estados de respuestas	pendiente	2025-10-23 03:37:42	2025-10-23 03:37:42	media
10	Validar campos	Validar los campos desde el front sin depender de los required	completada	2025-10-23 04:01:32	2025-10-23 15:32:57	media
8	Estudiar 1	Estudiar bastante sobre repository	pendiente	2025-10-23 03:39:45	2025-10-23 16:01:30	alta
12	aa	aa	pendiente	2025-10-23 16:01:38	2025-10-23 16:01:38	baja
13	BRANDON	A	completada	2025-10-23 16:02:29	2025-10-23 16:04:15	\N
14	BRANDON1	TAREAAA	pendiente	2025-10-23 16:10:20	2025-10-23 16:13:47	media
5	wwwwwwwwwwwww	Ahora tiene una nueva descripción AA1	pendiente	2025-10-23 03:36:49	2025-10-23 16:15:06	baja
16	assadsadsa	sadsadasd	pendiente	2025-10-23 16:44:33	2025-10-23 16:44:33	alta
\.


--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 230
-- Name: api_clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.api_clients_id_seq', 1, true);


--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 226
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 223
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 219
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);


--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 228
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 16, true);


--
-- TOC entry 4909 (class 2606 OID 17159)
-- Name: api_clients api_clients_identifier_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_clients
    ADD CONSTRAINT api_clients_identifier_unique UNIQUE (identifier);


--
-- TOC entry 4911 (class 2606 OID 17157)
-- Name: api_clients api_clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_clients
    ADD CONSTRAINT api_clients_pkey PRIMARY KEY (id);


--
-- TOC entry 4913 (class 2606 OID 17161)
-- Name: api_clients api_clients_token_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_clients
    ADD CONSTRAINT api_clients_token_unique UNIQUE (token);


--
-- TOC entry 4896 (class 2606 OID 17081)
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- TOC entry 4894 (class 2606 OID 17071)
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- TOC entry 4903 (class 2606 OID 17128)
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 4905 (class 2606 OID 17130)
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- TOC entry 4901 (class 2606 OID 17111)
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- TOC entry 4898 (class 2606 OID 17096)
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 4892 (class 2606 OID 17061)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4916 (class 2606 OID 17173)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 4907 (class 2606 OID 17144)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 4899 (class 1259 OID 17097)
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- TOC entry 4914 (class 1259 OID 17171)
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- TOC entry 4917 (class 1259 OID 17170)
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


-- Completed on 2025-10-23 12:15:19

--
-- PostgreSQL database dump complete
--

\unrestrict 3jaWQW3Z0WtkWfzgLi0IUcHwqBCz0jzXxzkaT691laAg7Y2VdpnvJlxYqqXhc5h

