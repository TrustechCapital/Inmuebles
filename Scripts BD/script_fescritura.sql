ALTER TABLE public.f_per_fun
    ADD COLUMN ffun_escritura numeric(1, 0);
	
UPDATE public.f_per_fun 
    SET ffun_escritura = 1;

ALTER TABLE public.f_per_fun
    ALTER COLUMN ffun_escritura SET NOT NULL;

ALTER TABLE public.f_per_fun
    ALTER COLUMN ffun_lectura SET NOT NULL;