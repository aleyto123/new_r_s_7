# SecureDocs en modo monolito

El frontend compilado y la API Express se sirven desde el mismo proceso. Para la demostración del balanceador se levantan tres copias en los puertos 8081, 8082 y 8083.

```bash
npm --prefix backend install
npm --prefix frontend install
chmod +x scripts/start-three.sh scripts/stop-three.sh
./scripts/start-three.sh
curl http://localhost:8081/health
```

Copia `nginx/balanceador.conf` a `/etc/nginx/conf.d/securedocs.conf`, valida con `sudo nginx -t` y recarga Nginx. El acceso se realiza desde `http://localhost/`.
