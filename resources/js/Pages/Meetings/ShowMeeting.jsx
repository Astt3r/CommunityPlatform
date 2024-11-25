import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { parseISO, format, isValid } from "date-fns";

// Registering a default font
Font.register({ family: 'Helvetica', src: 'https://fonts.gstatic.com/s/helvetica/v7/sW-KlwMSXsW7buS-aUr5.mp4' });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
  },
  title: {
    margin: 0,
    fontSize: 24,
  },
  subtitle: {
    margin: 5,
    fontSize: 18,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    textDecoration: "underline",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    flexGrow: 1,
  },
  signature: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBlock: {
    textAlign: "center",
    width: "45%",
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    marginTop: 50,
    paddingTop: 5,
  },
});

const MeetingPdfDocument = ({ meeting }) => {
  if (!meeting) {
    return null;
  }

  const formattedDate = meeting.meeting_date ? (() => {
    const dateObj = new Date(meeting.meeting_date);
    return isValid(dateObj) ? format(dateObj, "dd/MM/yyyy HH:mm 'UTC'") : "No especificado";
  })() : "No especificado";

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Acta de Reunión</Text>
          <Text style={styles.subtitle}>Tema Principal: {meeting.main_topic || "No especificado"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fecha y Hora:</Text>
          <Text>{formattedDate}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lugar:</Text>
          <Text>{meeting.location || "No especificado"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción:</Text>
          <Text>{meeting.description || "Sin descripción"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Organizada por:</Text>
          <Text>{meeting.organized_by || "No especificado"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asistentes:</Text>
          {meeting.attendees && meeting.attendees.length > 0 ? (
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Nombre</Text>
                <Text style={styles.tableCell}>Rol</Text>
              </View>
              {meeting.attendees.map((attendee, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableCell}>{attendee?.name || "No especificado"}</Text>
                  <Text style={styles.tableCell}>{attendee?.role || "No especificado"}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No hay asistentes registrados</Text>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Puntos Tratados:</Text>
          <Text>{meeting.agenda_points || "No especificado"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acuerdos y Tareas:</Text>
          <Text>{meeting.agreements || "No especificado"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estado de la Reunión:</Text>
          <Text>{meeting.status || "No especificado"}</Text>
        </View>
        <View style={styles.signature}>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureLine}>Presidente</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureLine}>Secretario</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function ShowMeeting({ meeting }) {
  const formattedDate = meeting.meeting_date ? (() => {
    const parsedDate = parseISO(meeting.meeting_date);
    const zonedDate = parsedDate; // Asumimos que la fecha ya es UTC
    return isValid(zonedDate) ? format(zonedDate, "dd/MM/yyyy HH:mm 'UTC'") : "No especificado";
  })() : "No especificado";

  return (
    <AuthenticatedLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Detalles de la Reunión
        </h2>
      }
    >
      <Head title={`Reunión - ${meeting.main_topic}`} />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow sm:rounded-lg p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Tema Principal:</h3>
              <p>{meeting.main_topic}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Fecha:</h3>
              <p>{formattedDate}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Descripción:</h3>
              <p>{meeting.description || "Sin descripción"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Lugar:</h3>
              <p>{meeting.location || "No especificado"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Organizada Por:</h3>
              <p>{meeting.organized_by || "No especificado"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Estado:</h3>
              <p
                className={`$ {
                  meeting.status === "scheduled"
                    ? "text-blue-500"
                    : meeting.status === "completed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {meeting.status}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Resultado:</h3>
              <p>{meeting.result || "No especificado"}</p>
            </div>
            <div className="mt-4">
              <a
                href="/meetings"
                className="text-blue-500 hover:text-blue-700"
              >
                Volver a la lista de reuniones
              </a>
            </div>
            <div className="mt-4">
                <a
                    href={`/meetings/${meeting.id}/attendance`}
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Registrar Asistencias
                </a>
            </div>

            <div className="mt-4">
              <PDFDownloadLink
                document={<MeetingPdfDocument meeting={meeting} />}
                fileName={`Acta_Reunion_${meeting.main_topic}.pdf`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {({ loading }) => loading ? 'Generando PDF...' : 'Generar Acta de Reunión en PDF'}
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
