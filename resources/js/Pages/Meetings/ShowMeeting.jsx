import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { parseISO, format, isValid } from "date-fns";

// Registering a default font
Font.register({ family: 'Helvetica', src: 'https://fonts.gstatic.com/s/helvetica/v7/sW-KlwMSXsW7buS-aUr5.mp4' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    backgroundColor: "#f3f3f3",
  },
  header: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#4A90E2",
    color: "#fff",
  },
  date: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 14,
    color: "#333",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  sectionContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  sectionContent: {
    fontSize: 14,
    color: "#555",
  },
});

const MeetingPdfDocument = ({ meeting }) => {
  if (!meeting) {
    return null;
  }

  // Asegurarse de que todos los valores estén definidos
  const mainTopic = meeting.main_topic || "No especificado";
  const location = meeting.location || "No especificado";
  const organizedBy = meeting.organized_by || "No especificado";
  const description = meeting.description || "Sin descripción";
  const status = meeting.status || "No especificado";

  // Formatear la fecha de la reunión en UTC
  const formattedDate = meeting.meeting_date ? (() => {
    const dateObj = new Date(meeting.meeting_date);
    return isValid(dateObj) ? format(dateObj, "dd 'de' MMMM 'de' yyyy") : "No especificado";
  })() : "No especificado";

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>ACTA DE LA REUNIÓN</Text>
        </View>
        <Text style={styles.date}>FECHA: {formattedDate}</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tema Principal</Text>
          <Text style={styles.sectionContent}>{mainTopic}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Lugar</Text>
          <Text style={styles.sectionContent}>{location}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Organizada por</Text>
          <Text style={styles.sectionContent}>{organizedBy}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.sectionContent}>{description}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Estado de la Reunión</Text>
          <Text style={styles.sectionContent}>{status}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default function ShowMeeting({ meeting }) {
  // Formatear la fecha de la reunión en UTC
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
              <h3 className="text-lg font-semibold">Junta Vecinal:</h3>
              <p>{meeting.neighborhood_association || "Reunión General"}</p>
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
