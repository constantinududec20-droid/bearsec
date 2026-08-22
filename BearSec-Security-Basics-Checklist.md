# BearSec Security Basics Checklist

Scop: verificare simpla pentru firme mici care vor sa isi puna bazele securitatii fara proiecte complicate.

Nu este pentest, audit legal, forensic sau garantie ca firma nu poate fi atacata. Este o verificare practica, orientata pe riscuri vizibile si reparatii rapide.

## 1. Date initiale

- Nume companie:
- Domeniu principal:
- Numar aproximativ utilizatori:
- Numar aproximativ calculatoare:
- Servere locale:
- Cloud folosit: Microsoft 365 / Google Workspace / altceva
- Cine administreaza IT-ul:
- Persoana de contact pentru urgente:
- Sisteme critice pentru business:

## 2. Account Security

- MFA activat pentru conturile de email.
- MFA activat pentru conturile de administrator.
- Nu exista conturi admin partajate.
- Conturile fostilor angajati sunt dezactivate.
- Exista lista cu toti utilizatorii activi.
- Parolele slabe/reutilizate sunt discutate si eliminate unde se poate.
- Conturile cu privilegii mari sunt separate de conturile normale.
- Exista metoda de recuperare conturi documentata.

## 3. Email Security

- SPF exista si este corect.
- DKIM este activ.
- DMARC exista.
- DMARC este macar in mod `p=none` pentru inceput.
- Nu exista multe servicii necunoscute autorizate sa trimita email pentru domeniu.
- Utilizatorii stiu cum sa raporteze emailuri suspecte.
- Exista protectie anti-spam/anti-phishing activa in platforma folosita.
- Semnele de spoofing/phishing sunt explicate pe scurt echipei.

## 4. Endpoint Security

- Antivirus/Defender este activ pe statiile verificate.
- Update-urile Windows/macOS/Linux sunt active.
- Disk encryption este activ unde are sens.
- Utilizatorii nu lucreaza zilnic cu drepturi de administrator local.
- Software-ul vechi/nefolosit este identificat.
- Remote access este controlat si documentat.
- USB/removable media este discutat ca risc.
- Exista inventar minim de dispozitive.

## 5. Backup

- Exista backup pentru datele importante.
- Backup-ul este automatizat.
- Backup-ul este testat macar ocazional.
- Exista cel putin o copie separata de sistemele principale.
- Accesul la backup este limitat.
- Cineva stie concret cum se restaureaza datele.
- Ransomware risk pentru backup este discutat.

## 6. Network & Remote Access

- Router/firewall are parola schimbata fata de default.
- Firmware-ul echipamentelor critice este actualizat.
- Porturile expuse in internet sunt cunoscute.
- RDP/SSH expus direct in internet este evitat sau protejat puternic.
- VPN-ul, daca exista, are MFA unde este posibil.
- Wi-Fi guest este separat de reteaua interna.
- Parola Wi-Fi este schimbata periodic sau la plecarea angajatilor relevanti.

## 7. Monitoring Starter

- Exista o lista cu sistemele care merita monitorizate.
- Se pot colecta loguri de pe servere importante.
- Failed logins sunt vizibile.
- Crearea de utilizatori/admini este vizibila.
- Serviciile noi instalate sunt vizibile.
- Modificarile pe fisiere critice pot fi monitorizate.
- Exista o metoda clara de notificare pentru alerte critice.
- Exista o persoana care decide ce se face cand apare o alerta.

## 8. Policies Simple

- Exista o regula simpla pentru parole si MFA.
- Exista o regula simpla pentru device-uri personale.
- Exista o regula simpla pentru acces remote.
- Exista o regula simpla pentru raportarea incidentelor.
- Exista o regula simpla pentru folosirea tool-urilor AI cu date confidentiale.
- Echipa stie cui ii scrie/suna cand ceva pare suspect.

## 9. Scor rapid

Foloseste scorul doar intern, ca orientare:

- 0 = lipseste complet
- 1 = exista partial / neclar
- 2 = exista si este ok

Categorii:

- Account Security: __ / 16
- Email Security: __ / 16
- Endpoint Security: __ / 16
- Backup: __ / 14
- Network & Remote Access: __ / 14
- Monitoring Starter: __ / 16
- Policies Simple: __ / 12

Total: __ / 104

## 10. Raport final

### Executive summary

Scrie 5-8 randuri, fara jargon. Exemplu:

Compania are o baza IT functionala, dar lipsesc cateva controale importante: MFA complet, DMARC, inventar endpointuri si proces clar de backup restore. Riscul principal este compromiterea conturilor prin phishing si lipsa vizibilitatii cand apar login-uri suspecte.

### Top 5 riscuri

1. 
2. 
3. 
4. 
5. 

### Recomandari prioritare

1. De facut in 7 zile:
2. De facut in 30 zile:
3. De facut in 90 zile:

### Ce poate face BearSec

- Configurare MFA si revizuire conturi.
- Verificare SPF/DKIM/DMARC.
- Hardening basic endpointuri.
- Setup monitoring starter cu Wazuh oficial.
- Raport lunar simplu.

