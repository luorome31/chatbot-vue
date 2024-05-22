<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div id="pdfPreview">
          
        </div>
        <button @click="downloadPdf">Download PDF</button>
      </div>
    </div> 
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  
  const props = defineProps({
    show: Boolean,
    messages: Array
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  
  const generatePdf = async () => {
    const pdfPreview = document.getElementById('pdfPreview');
    const chatContent = document.createElement('div');
    props.messages.forEach(msg => {
      const p = document.createElement('p');
      p.textContent = msg.isUser ? `User: ${msg.message}` : `AI: ${msg.message}`;
      chatContent.appendChild(p);
    });
    pdfPreview.appendChild(chatContent);

    const canvas = await html2canvas(chatContent);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10);
    const pdfBlob = pdf.output('blob');
  
    const pdfObjectUrl = URL.createObjectURL(pdfBlob);
    const embed = document.createElement('embed');
    embed.src = pdfObjectUrl;
    embed.type = 'application/pdf';
    embed.width = '100%';
    embed.height = '600px';
    pdfPreview.appendChild(embed);
  };
  
  watch(() => props.show, (newVal) => {
    if (newVal) {
      generatePdf();
    }
  });
  
  const downloadPdf = () => {
    const chatContent = document.createElement('div');
    props.messages.forEach(msg => {
      const p = document.createElement('p');
      p.textContent = msg.role === 'user' ? `User: ${msg.text}` : `AI: ${msg.text}`;
      chatContent.appendChild(p);
    });
  
    html2canvas(chatContent).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('chat.pdf');
    });
  };
  </script>
  
  <style>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
    text-align: center;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  