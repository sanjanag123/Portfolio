// Upload functionality for country pages
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const filesDisplay = document.getElementById('filesDisplay');
    
    // Load existing files from localStorage
    loadFiles();
    
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            addFileToDisplay(file);
            saveFileToStorage(file);
        });
    });
    
    function addFileToDisplay(file) {
        // Remove "no files" message if it exists
        const noFilesMsg = filesDisplay.querySelector('.no-files');
        if (noFilesMsg) {
            noFilesMsg.remove();
        }
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileIcon = getFileIcon(file.type);
        const fileSize = formatFileSize(file.size);
        
        let previewHtml = '';
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = fileItem.querySelector('.file-preview');
                if (img) img.src = e.target.result;
            };
            reader.readAsDataURL(file);
            previewHtml = '<img class="file-preview" src="" alt="Preview">';
        }
        
        fileItem.innerHTML = `
            <div class="file-icon">${fileIcon}</div>
            <div class="file-info">
                <p class="file-name">${file.name}</p>
                <p class="file-size">${fileSize}</p>
                ${previewHtml}
            </div>
        `;
        
        filesDisplay.appendChild(fileItem);
    }
    
    function getFileIcon(fileType) {
        if (fileType.startsWith('image/')) return '🖼️';
        if (fileType.includes('pdf')) return '📄';
        if (fileType.includes('word') || fileType.includes('document')) return '📝';
        if (fileType.includes('text')) return '📄';
        if (fileType.includes('video')) return '🎥';
        if (fileType.includes('audio')) return '🎵';
        return '📁';
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function saveFileToStorage(file) {
        const country = document.title.split(' - ')[0];
        const key = `files_${country}`;
        let files = JSON.parse(localStorage.getItem(key) || '[]');
        
        const fileData = {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            data: null // We'll store the file data for images
        };
        
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                fileData.data = e.target.result;
                files.push(fileData);
                localStorage.setItem(key, JSON.stringify(files));
            };
            reader.readAsDataURL(file);
        } else {
            files.push(fileData);
            localStorage.setItem(key, JSON.stringify(files));
        }
    }
    
    function loadFiles() {
        const country = document.title.split(' - ')[0];
        const key = `files_${country}`;
        const files = JSON.parse(localStorage.getItem(key) || '[]');
        
        if (files.length === 0) return;
        
        // Remove "no files" message
        const noFilesMsg = filesDisplay.querySelector('.no-files');
        if (noFilesMsg) {
            noFilesMsg.remove();
        }
        
        files.forEach(fileData => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const fileIcon = getFileIcon(fileData.type);
            const fileSize = formatFileSize(fileData.size);
            
            let previewHtml = '';
            if (fileData.type.startsWith('image/') && fileData.data) {
                previewHtml = `<img class="file-preview" src="${fileData.data}" alt="Preview">`;
            }
            
            fileItem.innerHTML = `
                <div class="file-icon">${fileIcon}</div>
                <div class="file-info">
                    <p class="file-name">${fileData.name}</p>
                    <p class="file-size">${fileSize}</p>
                    ${previewHtml}
                </div>
            `;
            
            filesDisplay.appendChild(fileItem);
        });
    }
});
