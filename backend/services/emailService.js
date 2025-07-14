import nodemailer from 'nodemailer'

class EmailService{
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'envios@arciel.com',
                pass: 'pila2019'
            }
        });
        this.from = 'envios@arciel.com';
        this.to = 'acichello@arciel.com';
    }

    async sendAltaPC(data) {

        console.log(data)
        const {
            planta_pc,
            categoria_pc,
            marca_pc,
            modelo_pc,
            usuario_pc,
            serial_pc,
            fecha_garantia_pc,
            almacenamiento_pc,
            ram_pc,
            so_pc,
            procesador_pc,
            monitor_pc,
            proveedor_pc,
            entrada_pc,
            salida_pc,
            disponibilidad_pc,
            comentarios_pc
        } = data;

        const disponible = disponibilidad_pc === true || disponibilidad_pc === 'true' || disponibilidad_pc === 'Disponible';

        const html = `
            <div style="max-width:600px;margin:auto;padding:20px;background:#fff;border-radius:16px;box-shadow:0 2px 8px #eee;border:1px solid #eee;font-family:sans-serif;">
              <h2 style="text-align:center;color:#2563eb;">🖥️ Alta de equipo</h2>
              <p style="text-align: left ">Se ha dado de alta a un nuevo equipo.</p>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;color:#333;font-size:15px;">
                <div><strong>📍 Planta:</strong> ${planta_pc}</div>
                <div><strong>📂 Categoría:</strong> ${categoria_pc}</div>
                <div><strong>🏷️ Marca:</strong> ${marca_pc}</div>
                <div><strong>🆔 Modelo:</strong> ${modelo_pc}</div>
                <div><strong>👤 Usuario:</strong> ${usuario_pc}</div>
                <div><strong>🔢 N° Serie:</strong> ${serial_pc}</div>
                <div><strong>🛡️ Garantía:</strong> ${fecha_garantia_pc}</div>
                <div><strong>💾 Almacenamiento:</strong> ${almacenamiento_pc} GB</div>
                <div><strong>🧠 RAM:</strong> ${ram_pc} GB</div>
                <div><strong>💻 Sistema Operativo:</strong> ${so_pc}</div>
                <div><strong>🖥️ Procesador:</strong> ${procesador_pc}</div>
                <div><strong>🖥️ Monitor:</strong> ${monitor_pc ? monitor_pc : 'No asignado'}</div>
                <div><strong>🚚 Proveedor:</strong> ${proveedor_pc}</div>
                <div><strong>📅 Entrada:</strong> ${entrada_pc || '-'}</div>
                <div><strong>📅 Salida:</strong> ${salida_pc || '-'}</div>
                <div><strong>✅ Disponible:</strong> <span style="color:${disponible ? '#16a34a' : '#dc2626'};font-weight:bold;">${disponible ? 'Disponible' : 'No disponible'}</span></div>
              <div style="margin-top:24px;border-top:1px solid #eee;padding-top:12px;">
                <h3 style="color:#555;">📝 Comentarios:</h3>
                <p style="font-style:italic;color:#666;">${comentarios_pc || ''}</p>
              </div>
            </div>
        `;

        await this.transporter.sendMail({
            from: this.from,
            to: this.to,
            subject: 'Nuevo registro de PC',
            html
        });
    }
}

export default new EmailService()